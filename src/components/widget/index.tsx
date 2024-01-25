import "./widget.scss";
import Header from "./components/Header";
import Messages from "./components/Messages";
import ChatInput from "./components/ChatInput";
import Home from "./components/Home";
import { useState } from "react";
import AppLayout from "../shared/Layout/AppLayout";
// interface ViewState {
//   view: "history" | "new";
// }

const Widget = () => {
  const [view, setView] = useState("home");
  const handleChangeView = (val: string) => {
    setView(val);
  };
  return (
    <main
      id="gooeyChat-widget-container"
      className="br-large flex-1 d-flex flex-col justify-start pos-relative overflow-hidden"
    >
      <AppLayout onViewChange={handleChangeView} view={view}>
        <>
          {view === "messages" ? (
            <div
              className="pos-relative d-flex flex-col flex-1"
              style={{ maxHeight: "100%" }}
            >
              <Header onViewChange={handleChangeView} />
              <Messages />
              <ChatInput />
            </div>
          ) : null}
          <div>{view === "home" && <Home />}</div>
        </>
      </AppLayout>
    </main>
  );
};

export default Widget;
