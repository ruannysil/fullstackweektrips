import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined" | "danger" ;
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primaryDarker",
    outlined: "hover:bg-primaryDarker bg-transparent border-2 border-primary text-primary hover:text-white",
    danger: "bg-red-500 text-red-500 hover:text-white hover:bg-red-600 bg-transparent border-red-500 border-2"

  };

  const _className = twMerge(variantClasses[variant], "appearance-none rounded-lg p-2 text-sm font-medium shadow transition-all", className);

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;