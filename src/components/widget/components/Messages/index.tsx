import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import PlaceholderMessage, { DEMO_QUERIES } from "./PlaceholderMessage";
import ResponseLoader from "../Loader";
import { useResponseContext } from "src/App";

const Suggestions = () => {
  const { initializeQuery } = useResponseContext();
  return (
    <div className="mb-80">
      <p>I can also tell you about</p>
      <button
        onClick={() => initializeQuery(DEMO_QUERIES.c)}
        className="medium mt-10 cr-pointer b-none p-12 button-hover"
      >
        {DEMO_QUERIES.c}
      </button>
      <button
        onClick={() => initializeQuery(DEMO_QUERIES.d)}
        className="medium mt-10 cr-pointer b-none p-12 button-hover"
      >
        {DEMO_QUERIES.d}
      </button>
    </div>
  );
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
    <div className="flex-1 pl-16 pr-16 pt-16 overflow-scroll">
      {!responses?.queue?.length && !isSending && <PlaceholderMessage />}
      <Response queue={responses.queue} data={responses.data} />
      {!isSending && <Suggestions />}
      <ResponseLoader show={isSending} />
    </div>
  );
};

export default Messages;
