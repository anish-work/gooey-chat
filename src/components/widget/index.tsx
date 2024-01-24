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
  return (
    <div
      id="gooeyChat-widget-container"
      className="br-large d-flex flex-col pos-relative overflow-hidden"
    >
      <AppLayout>
        {/* <Header />
        <Messages />
        <ChatInput /> */}
        <div>{view === "home" && <Home />}</div>
      </AppLayout>
    </div>
  );
};

export default Widget;
