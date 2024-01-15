import { ReactNode } from "react";

const ButtonPaddings = {
  small: "p-4 ",
  medium: "p-8 ",
  large: "p-12 ",
};

interface ButtonProps {
  size?: "medium" | "small" | "small";
  children?: ReactNode;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const size: "medium" | "small" | "small" = props.size || "medium";
  const btnClasses =
    "text-white button-hover bg-darkGrey b-none cr-pointer p-12" +
    ButtonPaddings[size] +
    " " +
    props.className;

  return (
    <div>
      <button className={btnClasses} {...props}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
