import "./App.css";
import Widget from "./components/widget";
import Launcher from "./components/launcher";
import { createContext, useContext, useState } from "react";
import "./css/root.scss";

const WidgetContext = createContext({});
export const useWidgetContext = () => useContext(WidgetContext);

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
      <div style={{ height: "100%" }} className="no-scroll-bar">
        {!widgetState.open && <Launcher />}
        {widgetState.open && <Widget />}
      </div>
    </WidgetContext.Provider>
  );
}

export default App;
