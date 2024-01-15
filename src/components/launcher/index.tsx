import { useCallback, useEffect } from "react";
import reactLogo from "../../assets/react.svg";
import { useWidgetContext } from "../../App";

const Launcher = () => {
  const { toggleWidget, widgetState } = useWidgetContext();

  const receiveMessage = (event: any) => {
    console.log(event.data.type, ">>REC");
    if (event && event.data.type === "DOM_MAXIMIZE_WIDGET_DONE")
      toggleWidget(true);
    if (event && event.data.type === "DOM_MINIMIZE_WIDGET_DONE")
      toggleWidget(false);
  };

  const sendMessage = useCallback(() => {
    console.log();
    if (!widgetState.open)
      return window.parent.postMessage({ type: "DOM_MAXIMIZE_WIDGET" }, "*");
    return window.parent.postMessage({ type: "DOM_MINIMIZE_WIDGET" }, "*");
  }, [widgetState.open]);

  useEffect(() => {
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        paddingRight: "16px",
        paddingBottom: "16px",
      }}
    >
      <button onClick={sendMessage}>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </button>
    </div>
  );
};

export default Launcher;
