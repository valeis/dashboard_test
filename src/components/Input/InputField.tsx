import React from "react";
import "./InputField.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  message?: string;
}

const InputField = ({ error, message, ...props }: InputProps) => {
  return (
    <div className="input_form">
      <input className="form-control" formNoValidate {...props} />
      {<span>{message}</span>}
      {error && <span className="span_form">{error}</span>}
    </div>
  );
};

export default InputField;
