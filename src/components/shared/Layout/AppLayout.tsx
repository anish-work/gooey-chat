import clsx from "clsx";
import { useMemo } from "react";
import "./appLayout.css";
import HomeIcon from "src/assets/SvgIcons/HomeIcon";
import MessageIcon from "src/assets/SvgIcons/MessageIcon";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  view?: string;
  onViewChange?: (val: string) => void;
};

const getHeightClass = (view: string | undefined) => {
  if (view === "messages") return "header-height-full";
  return "header-height-0";
};

const AppLayout = ({
  children,
  view,
  onViewChange = () => undefined,
}: Props) => {
  const headerHeightClass = useMemo(() => getHeightClass(view), [view]);
  return (
    <main className="layout-container h-100 d-flex flex-col">
      <div
        className={clsx(
          "bg-primary pos-absolute w-100 layout-header",
          headerHeightClass
        )}
      />
      <>
        <div
          style={{ flex: "1 1 0%", overflowY: "hidden" }}
          className="pos-relative d-flex flex-col"
        >
          <>{children}</>
        </div>

        {/* Nav Footer */}
        {view === "home" && (
          <div className="bg-white nav-footer-container w-100 d-flex">
            <div
              onClick={() => onViewChange("home")}
              className={clsx(
                "d-flex flex-col align-center pt-12 pb-12  flex-1 cr-pointer",
                view === "home" ? "bg-darkGrey text-white" : "hover-bg-primary"
              )}
            >
              <HomeIcon
                style={{ width: "24px" }}
                className={clsx(view === "home" && "stroke-white")}
              />
              <p className="mt-6">Home</p>
            </div>
            <div
              onClick={() => onViewChange("messages")}
              className="d-flex flex-col align-center pt-12 pb-12 hover-bg-primary flex-1 cr-pointer"
            >
              <MessageIcon style={{ width: "24px" }} />
              <p className="mt-6">Chat</p>
            </div>
          </div>
        )}
      </>
    </main>
  );
};

export default AppLayout;
