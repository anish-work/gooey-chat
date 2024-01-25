import clsx from "clsx";
import { ButtonProps } from "./Button";

const IconButton = ({
  className,
  variant = "a",
  onClick,
  ...rest
}: ButtonProps) => {
  const btnClasses = clsx(
    `button${variant?.toUpperCase()}`,
    "b-none br-default button-hover text-white cr-pointer icon-btn p-12 font_16_500 ",
    className
  );
  return (
    <button {...rest} className={btnClasses} onMouseDown={onClick}>
      {rest.children}
    </button>
  );
};

export default IconButton;
