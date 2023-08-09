import React, { useState, useRef } from "react";
import * as ServerApi from "utils/serverApi";
import "./register.scss";
import InputCom from "../../components/Input/InputCom";
import ButtonCom from "../../components/Button/ButtonCom";
import { Link } from "react-router-dom";

const Register = () => {
  const registerDivRef = useRef(null);
  const successfulRegistrationMsgRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_name: document.getElementById("register_user_name-input").value,
      email: document.getElementById("register_email-input").value,
      password: document.getElementById("register_pass-input").value,
    };

    ServerApi.register(data)
      .then((res) => {
        console.log(res);
        const registerDiv = registerDivRef.current;
        const registeredMsg = successfulRegistrationMsgRef.current;
        if (registerDiv) {
          registerDiv.parentNode.removeChild(registerDiv);
        }
        registeredMsg.classList.remove("hidden");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register-form">
      <div className="register-div" ref={registerDivRef}>
        <form id="register-form" onSubmit={handleSubmit}>
          <InputCom
            inputType="text"
            placeholder="User name"
            id="user_name"
            inputId="register_user_name-input"
            className="input-com"
            setValue={setUserName}
            value={userName}
          />
          <InputCom
            inputType="text"
            placeholder="Email address"
            id="email"
            inputId="register_email-input"
            className="input-com"
            setValue={setEmail}
            value={email}
          />
          <InputCom
            inputType="password"
            placeholder="Password"
            id="user_pass"
            inputId="register_pass-input"
            className="input-com"
            setValue={setPass}
            value={pass}
          />
          <ButtonCom onClick={handleSubmit} btnValue="Register"></ButtonCom>
        </form>
        <Link className="link register-link" to="/login">
          Already have an account? Login here
        </Link>
      </div>
      <h2
        ref={successfulRegistrationMsgRef}
        className="successful-registration-msg hidden"
      >
        {`Congratulations ${userName}! You've registered to the app. please
        login.`}
      </h2>
    </div>
  );
};
export default Register;
