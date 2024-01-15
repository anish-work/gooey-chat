import "./incoming.scss";

const IncomingMsg = (props: any) => {
  const { output_text = "Placeholder Text ...." } = props.data;
  return (
    <div className="gooey-incomingMsg">
      <div className="d-flex">
        = <p className="font_16_500 mb-10 ml-10">Answer</p>
      </div>
      <p className="font_24_500 anim-typing">{output_text}</p>
    </div>
  );
};

export default IncomingMsg;
