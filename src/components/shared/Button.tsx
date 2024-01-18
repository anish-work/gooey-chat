import { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";

const ButtonPaddings = {
  small: "p-4 ",
  medium: "p-12 ",
  large: "p-16",
};

export interface ButtonProps {
  size?: "medium" | "small" | "small";
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  variant?: "a" | "b";
}

const Button = ({
  size = "medium",
  variant = "b",
  className = "",
  onClick,
  ...rest
}: ButtonProps) => {
  const btnClasses = clsx(
    `button${variant?.toUpperCase()}`,
    "b-none cr-pointer p-8 br-default",
    ButtonPaddings[size],
    className
  );

  return (
    <button {...rest} onMouseDown={onClick} className={btnClasses}>
      {rest.children}
    </button>
  );
};

export default Button;
