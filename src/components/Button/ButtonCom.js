/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./buttonCom.css";

export default function buttonCom(props) {
  return (
    <div className="btn-component">
      <a href="#" onClick={props.onClick}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {props.btnValue}
      </a>
    </div>
  );
}
