import "./App.css";
import Widget from "./components/widget";
import Launcher from "./components/launcher";
import "./css/root.scss";
import clsx from "clsx";
import { useSystemContext } from "./contexts/hooks";

function App() {
  const { open }: any = useSystemContext();
  return (
    <div tabIndex={-1} role="reigon">
      <div
        className={clsx(
          "br-large pos-absolute d-flex flex-col",
          open && "bg-light"
        )}
        style={{ inset: 0 }}
      >
        {!open && <Launcher />}
        {open && <Widget />}
        {/* <Widget /> */}
      </div>
    </div>
  );
}

export default App;
