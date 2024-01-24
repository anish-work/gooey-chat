import clsx from "clsx";
import { useMemo } from "react";
import "./appLayout.css";
import HomeIcon from "src/assets/SvgIcons/HomeIcon";
import MessageIcon from "src/assets/SvgIcons/MessageIcon";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  view?: string;
};

const getHeightClass = (view: string | undefined) => {
  console.log(view, ">>");
  return "header-height-0";
};

const AppLayout = ({ children, view }: Props) => {
  const headerHeightClass = useMemo(() => getHeightClass(view), [view]);
  return (
    <div className="layout-container">
      <div
        className={clsx(
          "bg-primary pos-absolute w-100 layout-header",
          headerHeightClass
        )}
      />
      <>
        {children}

        {/* Nav Footer */}
        <div className="pos-absolute bg-white nav-footer-container w-100 d-flex">
          <div
            className={
              "d-flex flex-col align-center pt-12 pb-12 hover-bg-primary hover- flex-1 cr-pointer"
            }
          >
            <HomeIcon style={{ width: "24px" }} />
            <p className="mt-6">Home</p>
          </div>
          <div className="d-flex flex-col align-center pt-12 pb-12 hover-bg-primary flex-1 cr-pointer">
            <MessageIcon style={{ width: "24px" }} />
            <p className="mt-6">Messages</p>
          </div>
        </div>
      </>
    </div>
  );
};

export default AppLayout;
