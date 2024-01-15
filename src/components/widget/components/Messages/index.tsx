import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import PlaceholderMessage from "./PlaceholderMessage";
import ResponseLoader from "../Loader";
import { useResponseContext } from "src/App";

const Suggestions = () => {
  return null;
};

const Response = (props: any) => {
  const data = props.data;
  const que = props.queue;

  return (
    <div>
      {que.map((id) => {
        const responseData = data[id];
        const role = responseData.role;

        return (
          <div key={id}>
            {role === "user" ? (
              <OutgoingMsg data={responseData} />
            ) : (
              <IncomingMsg data={responseData} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const Messages = () => {
  const { responses, isSending } = useResponseContext();

  return (
    <div className="flex-1 pl-8 pr-8 pt-8 overflow-scroll">
      {!responses?.queue?.length && !isSending && <PlaceholderMessage />}
      {!isSending && <Suggestions />}
      <Response queue={responses.queue} data={responses.data} />
      <ResponseLoader show={isSending} />
    </div>
  );
};

export default Messages;
