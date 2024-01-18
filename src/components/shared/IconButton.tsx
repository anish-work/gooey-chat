import { ButtonProps } from "./Button";

const IconButton = ({ className, onClick, ...rest }: ButtonProps) => {
  const btnClasses =
    "b-none br-default buttonA button-hover text-white cr-pointer icon-btn p-12 font_16_500 " +
    className;
  return (
    <button {...rest} className={btnClasses} onMouseDown={onClick}>
      {rest.children}
    </button>
  );
};

export default IconButton;
