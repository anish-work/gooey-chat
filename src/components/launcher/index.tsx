import { useCallback, useEffect } from "react";
import brandLogo from "../../assets/brand-logo.svg";
import "./launcher.scss";
import { useWidgetContext } from "../contexts/widgetContext";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        bottom: 0,
        right: 0,
      }}
      className="pos-absolute pb-16 pr-16"
    >
      <button
        onClick={sendMessage}
        className="gooeyChat-launchButton hover-grow cr-pointer br-large bx-shadowA bg-darkGrey button-hover"
      >
        <img src={brandLogo} className="logo react" alt="React logo" />
      </button>
    </div>
  );
};

export default Launcher;
