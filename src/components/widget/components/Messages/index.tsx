import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import PlaceholderMessage, { DEMO_QUERIES } from "./PlaceholderMessage";
import ResponseLoader from "../Loader";
import { useResponseContext } from "src/App";
import Button from "src/components/shared/Button";

const Suggestions = () => {
  const { initializeQuery }: any = useResponseContext();
  return (
    <div className="pb-16">
      <p className="font_12_500 mb-12">I can also tell you about</p>
      <Button
        className="mb-8"
        variant="b"
        onClick={() => initializeQuery(DEMO_QUERIES.c)}
      >
        {DEMO_QUERIES.c}
      </Button>
      <Button
        className="mt-8 mb-8"
        variant="b"
        onClick={() => initializeQuery(DEMO_QUERIES.d)}
      >
        {DEMO_QUERIES.d}
      </Button>
    </div>
  );
};

const Response = (props: any) => {
  const data = props.data;
  const que = props.queue;

  if (!que) return null;
  return (
    <div>
      {que.map((id: string) => {
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
  const { responses, isSending }: any = useResponseContext();

  return (
    <div className="flex-1 bg-white mt-16 mr-16 mb-16 p-16  overflow-scroll br-large-right">
      {!responses?.queue?.length && !isSending && <PlaceholderMessage />}
      <Response queue={responses.queue} data={responses.data} />
      {responses?.queue?.length && !isSending && <Suggestions />}
      <ResponseLoader show={isSending} />
    </div>
  );
};

export default Messages;
