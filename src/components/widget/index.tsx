import { useState } from "react";
import "./widget.scss";
import Header from "./components/Header";
import Messages from "./components/Messages";
import ChatInput from "./components/ChatInput";


const Widget = () => {
  const [viewState, setViewState] = useState<ViewState>({
    view: "new",
  });

  const handleViewChange = (val: "history" | "new") => {
    setViewState((prev) => ({ ...prev, view: val }));
  };

  return (
    <div
      id="gooeyChat-widget-container"
      className="bg-white bx-shadowA d-flex flex-col pos-relative "
    >
      <Header viewState={viewState} onViewChange={handleViewChange} />
      <Messages />
      <ChatInput />
    </div>
  );
};

export default Widget;
