import React from "react";

import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ type = "button", ...props }: ButtonProps) => {
  return (
    <button
      className={`${'button'} ${props.className}`}
      type={type}
      {...props}
    />
  );
};

export default Button;
