import React from "react";
import "./inputCom.css";
import { useEffect } from "react";

export default function InputCom(props) {
  var inputCom;
  useEffect(() => {
    inputCom = document.getElementById(props.inputId);
  });
  const handleChange = (event) => {
    if (inputCom.classList.contains("error")) {
      inputCom.classList.remove("error");
    }
    props.setValue(event.target.value);
  };

  return (
    <div className="input-component">
      <div className="input-group">
        <input
          type={props.inputType}
          id={props.inputId}
          required
          className={`input ${props.className}`}
          onChange={handleChange}
          value={props.value}
        ></input>
        <label className="input-label">{props.placeholder}</label>
      </div>
    </div>
  );
}
