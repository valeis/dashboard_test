import React from 'react'
import './InputField.css'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    type: string, 
    value?: string,
    error?: string,
    message?: string
}

const InputField = ({ id, type, placeholder, value, onChange, error, message}:InputProps) => {

 return <div className='input_form'>
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
    {error && <span className='span_form'>{error}</span>}
  </div>
};

export default InputField;