import "./App.css";
import Widget from "./components/widget";
import Launcher from "./components/launcher";
import "./css/root.scss";
import clsx from "clsx";
import { useSystemContext } from "./contexts/hooks";

function App() {
  const { open } = useSystemContext();
  return (
    <div
      className={clsx(
        "h-100 no-scroll-bar br-large overflow-hidden",
        open && "bg-light"
      )}
    >
      {!open && <Launcher />}
      {open && <Widget />}
      {/* <Widget /> */}
    </div>
  );
}

export default App;
