import brandLogo from "src/assets/brand-logo.svg";
import "./header.scss";
import IconButton from "src/components/shared/IconButton";
import { useWidgetContext } from "src/App";

interface HeaderProps {
  onViewChange: object | null;
}
const Header = (props: HeaderProps) => {
  console.log(props, ">>");
  const { toggleWidget } = useWidgetContext();

  const handleClose = () => {
    toggleWidget(false);
  };

  return (
    <div className="p-10 gooeyChat-widget-headerContainer d-flex justify-between align-center">
      <div className="d-flex align-center">
        {/* Logo */}
        <img
          src={brandLogo}
          alt="brand-logo"
          style={{ width: "40px", height: "40px" }}
        />
        <p className="ml-10">Welcome to Gooey Chat</p>
      </div>

      <IconButton onClick={handleClose} size={24} className="mr-10">
        X
      </IconButton>
    </div>
  );
};

export default Header;
