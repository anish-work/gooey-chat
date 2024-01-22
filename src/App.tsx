import "./App.css";
import Widget from "./components/widget";
import Launcher from "./components/launcher";
import { createContext, useState } from "react";
import "./css/root.scss";
import clsx from "clsx";
import MessagesContextProvider from "./contexts/MessagesContext";

export const WidgetContext = createContext({});

function App() {
  const [widgetState, setWidgetState] = useState({
    open: false,
  });

  const toggleWidget = (val: boolean) => {
    setWidgetState((prev) => ({ ...prev, open: val }));
  };

  const value = {
    toggleWidget,
    widgetState,
  };

  return (
    <WidgetContext.Provider value={value}>
      <MessagesContextProvider>
        <div
          className={clsx(
            "h-100 no-scroll-bar br-large overflow-hidden",
            widgetState.open && "bg-light"
          )}
        >
          {!widgetState.open && <Launcher />}
          {widgetState.open && <Widget />}
          {/* <Widget /> */}
        </div>
      </MessagesContextProvider>
    </WidgetContext.Provider>
  );
}

export default App;
