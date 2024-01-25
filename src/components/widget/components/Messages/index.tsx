import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import PlaceholderMessage, { DEMO_QUERIES } from "./PlaceholderMessage";
import ResponseLoader from "../Loader";

import Button from "src/components/shared/Button";
import { useMessagesContext } from "src/contexts/hooks";

const Suggestions = () => {
  const { initializeQuery }: any = useMessagesContext();
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
  const que = props.queue;
  const msgs = props.data;

  if (!que) return null;
  return (
    <div>
      {que.map((id: string) => {
        const responseData = msgs.get(id);
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
  const { messages, isSending }: any = useMessagesContext();

  return (
    <div className="flex-1 bg-white mt-16 mr-16 mb-16 overflow-scroll p-16 br-large-right">
      {!messages?.size && !isSending && <PlaceholderMessage />}
      <Response queue={Array.from(messages.keys())} data={messages} />
      {!!messages?.size && !isSending && <Suggestions />}
      <ResponseLoader show={isSending} />
    </div>
  );
};

export default Messages;
