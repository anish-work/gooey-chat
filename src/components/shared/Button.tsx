import { ReactNode } from "react";
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
  onClick?: () => null;
  variant?: "a" | "b";
}

const Button = (props: ButtonProps) => {
  const size: "medium" | "small" | "small" = props.size || "medium";
  const variant = props.variant || "a";
  const btnClasses = clsx(
    `button${variant?.toUpperCase()}`,
    "b-none cr-pointer p-8 br-default",
    ButtonPaddings[size],
    props.className
  );

  return (
    <button {...props} onMouseDown={props.onClick} className={btnClasses}>
      {props.children}
    </button>
  );
};

export default Button;
