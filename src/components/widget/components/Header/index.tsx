import brandLogo from "src/assets/brand-logo.svg";
import "./header.scss";
import IconButton from "src/components/shared/IconButton";
import { useSystemContext } from "src/contexts/hooks";

// interface HeaderProps {
//   onViewChange: object | null;
//   viewState: object | null;
// }
const Header = () => {
  const { toggleWidget } = useSystemContext();

  return (
    <div className="p-16 bg-white br-large b-1 gooeyChat-widget-headerContainer d-flex justify-between align-center">
      <div className="d-flex align-center">
        {/* Logo */}
        <img
          src={brandLogo}
          alt="brand-logo"
          style={{ width: "40px", height: "40px" }}
        />
        <div className="ml-16">
          <p className="font_12_400">Chat with</p>
          <p className="font_16_500">RadBot: Baangmoy</p>
        </div>
      </div>

      <IconButton
        onClick={toggleWidget}
        className="pt-12 pb-11 pl-16 pr-16 br-large font_16_600 h-100 hover-grow"
      >
        ❌
      </IconButton>
    </div>
  );
};

export default Header;
