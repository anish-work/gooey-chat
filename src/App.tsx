import "./App.css";
import Widget from "./components/widget";
import Launcher from "./components/launcher";
import { createContext, useContext, useState } from "react";
import "./css/root.scss";
import { v4 as uuidv4 } from "uuid";
import { sendMessageApi } from "./api/message";

const DEFAULT_MESSAGES_STATE = {
  queue: [],
  data: {},
};
interface IncomingMsg {
  input_prompt: string;
}

const figureOutType = (data: any) => {
  const out = [];
  const { output_video, output_audio, output_text } = data;
  if (output_text.length) out.push("text");
  if (output_audio.length) out.push("audio");
  if (output_video.length) out.push("video");
  return out;
};

const createNewResponse = (data: any, input: any) => {
  const { output, id, created_at } = data;
  const type = figureOutType(output);
  return { id, created_at, type, ...output, ...input, role: "assistant" };
};

const createNewQuery = (query: string) => {
  return {
    id: uuidv4(),
    input_text: query,
    role: "user",
    type: ["text"],
  };
};

export const WidgetContext = createContext({});
const MessagesContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useResponseContext = () => useContext(MessagesContext);
function App() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES_STATE);
  const [isSending, setIsSendingMessage] = useState(false);
  const [history, setHistory] = useState([""]);
  const [widgetState, setWidgetState] = useState({
    open: false,
  });

  const toggleWidget = (val: boolean) => {
    setWidgetState((prev) => ({ ...prev, open: val }));
  };

  const value = {
    toggleWidget,
    widgetState,
  };

  const initializeQuery = (query: string) => {
    setIsSendingMessage(true);
    const newQuery = createNewQuery(query);
    setHistory((prev) => [...prev, query]);
    sendPrompt({ input_prompt: query });
    addResponse(newQuery);
  };

  const addResponse = (response: any) => {
    setMessages((prev: any) => {
      const que = [...prev.queue, response.id];
      const data = prev.data;
      data[response.id] = response;
      return {
        queue: que,
        data,
      };
    });
  };

  const sendPrompt = async (payload: IncomingMsg) => {
    try {
      const res = await sendMessageApi(payload);
      if (res.status === 200) {
        const newResponse = createNewResponse(res.data, payload);
        addResponse(newResponse);
        setIsSendingMessage(false);
        // setTimeout(() => {
        //   addResponse(newResponse);
        //   setIsSendingMessage(false);
        // }, 4000);
      }
    } catch (err) {
      console.log("Api Failed!", err);
    }
  };

  const valueMessages = {
    sendPrompt,
    responses: messages,
    isSending,
    initializeQuery,
    history,
  };

  return (
    <WidgetContext.Provider value={value}>
      <MessagesContext.Provider value={valueMessages}>
        <div style={{ height: "100%" }} className="no-scroll-bar">
          {!widgetState.open && <Launcher />}
          {widgetState.open && <Widget />}
        </div>
      </MessagesContext.Provider>
    </WidgetContext.Provider>
  );
}

export default App;
