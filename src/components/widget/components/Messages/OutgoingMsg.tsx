import "./outgoing.scss";

const OutgoingMsg = (props: any) => {
  const { input_text = "Placeholder Text ....", input_prompt = "" } =
    props.data;
  return (
    <div className="gooey-outgoingMsg bg-white mb-12 bg-light">
      <p className="font_10_500 mb-10">🙃 You asked</p>
      <p className="font_24_500 anim-typing"> {input_text || input_prompt}</p>
    </div>
  );
};

export default OutgoingMsg;
