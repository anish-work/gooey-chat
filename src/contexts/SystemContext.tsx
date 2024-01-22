import { createContext, useCallback, useEffect, useState } from "react";
import { useMessagesContext } from "./hooks";

export const SystemContext = createContext({});
interface SystemContextState {
  open: boolean;
  isInitialized: boolean;
}

const getMode = (state: SystemContextState) => {
  if (!state.isInitialized && !state.open) return "off";
  if (state.isInitialized && !state.open) return "standby";
  if (state.isInitialized && state.open) return "on";
};

const SystemContextProvider = (props: any) => {
  const { preLoadData, messages } = useMessagesContext();
  const [widgetState, setWidgetState] = useState<SystemContextState>({
    open: false,
    isInitialized: false,
  });

  const mode = getMode(widgetState);

  const handleWidgetChange = (val: boolean, payload?: any) => {
    if (payload) {
      const data = JSON.parse(payload);
      if (data.isInitialized) preLoadData(data.data);
    }
    setWidgetState((prev) => ({
      ...prev,
      open: val,
      isInitialized: true,
    }));
  };

  const receiveMessage = (event: any) => {
    if (event && event.data.type === "DOM_MAXIMIZE_WIDGET_DONE")
      handleWidgetChange(true, event.data.payload);
    if (event && event.data.type === "DOM_MINIMIZE_WIDGET_DONE")
      handleWidgetChange(false);
  };

  const handleWidgetToggle = useCallback(() => {
    if (!widgetState.open) {
      return window.parent.postMessage({ type: "DOM_MAXIMIZE_WIDGET" }, "*");
    }
    const newData = Array.from(messages.values());
    return window.parent.postMessage(
      {
        type: "DOM_MINIMIZE_WIDGET",
        payload: JSON.stringify({ data: newData, isInitialized: true }),
      },
      "*"
    );
  }, [widgetState.open, messages]);

  useEffect(() => {
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    open: widgetState.open,
    mode,
    toggleWidget: handleWidgetToggle,
  };
  return (
    <SystemContext.Provider value={value}>
      {props.children}
    </SystemContext.Provider>
  );
};

export default SystemContextProvider;
