import { useEffect } from "react";
import "./inputCom.scss";

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
          style={props.style}
        ></input>
        <label className="input-label">{props.placeholder}</label>
      </div>
    </div>
  );
}
