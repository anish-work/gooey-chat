import "./header.scss";
import IconButton from "src/components/shared/IconButton";
import { useSystemContext } from "src/contexts/hooks";
import BackIcon from "src/assets/SvgIcons/BackIcon";

type HeaderProps = {
  onViewChange: (val: string) => void;
};
const Header = ({ onViewChange }: HeaderProps) => {
  const { toggleWidget }: any = useSystemContext();

  return (
    <div className="p-16 bg-white br-large b-1 gooeyChat-widget-headerContainer d-flex justify-between align-center">
      <div className="d-flex align-center">
        {/* Logo */}
        <IconButton
          className="hover-bg-primary p-6 cr-pointer flex-1"
          onClick={() => onViewChange("home")}
        >
          <BackIcon style={{ width: "24px" }} />
        </IconButton>
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
