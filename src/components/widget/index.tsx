import "./widget.scss";
import Header from "./components/Header";
import Messages from "./components/Messages";
import ChatInput from "./components/ChatInput";
// interface ViewState {
//   view: "history" | "new";
// }

const Widget = () => {
  // const [viewState, setViewState] = useState<ViewState>({
  //   view: "new",
  // });

  // const handleViewChange = (val: "history" | "new") => {
  //   setViewState((prev) => ({ ...prev, view: val }));
  // };

  return (
    <div
      id="gooeyChat-widget-container"
      className="br-large d-flex flex-col pos-relative overflow-hidden"
    >
      <Header />
      <Messages />
      <ChatInput />
    </div>
  );
};

export default Widget;
