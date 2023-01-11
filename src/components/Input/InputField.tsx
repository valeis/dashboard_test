import React from 'react'
import classes from './InputField.module.css'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    // id: string, 
    type: string, 
    // placeholder: string,
    value?: string,
    error?: string,
    message?: string
}

const InputField = ({ id, type, placeholder, value, onChange, error, message}:InputProps) => {

 return <div className={classes.input}>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="form-control"
      value={value}
      onChange={onChange}
      formNoValidate
    />
    {<span>{message}</span>}
    {error && <span className={classes.span}>{error}</span>}
  </div>
};

export default InputField;