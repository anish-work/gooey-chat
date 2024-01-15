import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";

const Messages = () => {
  return (
    <div className="flex-1 pl-8 pr-8 pt-8 overflow-scroll">
      <OutgoingMsg />
      <IncomingMsg />
      <IncomingMsg />
      <IncomingMsg />
      <IncomingMsg />
      <IncomingMsg />
      <IncomingMsg />
      <IncomingMsg />
    </div>
  );
};

export default Messages;
