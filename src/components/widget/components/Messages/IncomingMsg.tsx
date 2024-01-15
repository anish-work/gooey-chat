import "./incoming.scss";

const IncomingMsg = (props: any) => {
  const { output_text = "Placeholder Text ...." } = props.data;
  return (
    <div className="gooey-incomingMsg pb-24 mb-24">
      <div className="d-flex align-center">
        <p className="font_10_500 mb-10">🤖 I would say</p>
      </div>
      <p className="font_24_500 anim-typing">{output_text}</p>
    </div>
  );
};

export default IncomingMsg;
