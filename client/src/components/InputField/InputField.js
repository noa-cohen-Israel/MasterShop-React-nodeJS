import React, { useState } from "react";
import "./InputField.css";

//Component that returns an input box and a label
function InputField({
  label,
  name,
  type,
  value,
  onChange,
  small,
  placeholder
}) {
  return (
    <div className= "mb-4-rtl row">
      <label htmlFor={name} className="col-sm-4 col-form-label">
        {label}:*
      </label>
      <div className="col-sm-8">
        <input
          className="form-control"
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <small className="form-text valid">{small}</small>
      </div>
    </div>
  );
}
export default InputField;
