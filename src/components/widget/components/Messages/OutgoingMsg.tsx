import "./outgoing.scss";

const OutgoingMsg = (props: any) => {
  const { input_text = "Placeholder Text ....", input_prompt = "" } =
    props.data;
  return (
    <div className="gooey-outgoingMsg bg-white mb-12 bg-light br-large-left">
      <p className="font_10_500">🙃 You asked</p>
      <p className="font_22_400 anim-typing"> {input_text || input_prompt}</p>
    </div>
  );
};

export default OutgoingMsg;
