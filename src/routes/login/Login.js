import React, { useState, useRef } from "react";
import "./login.css";
import InputCom from "../../components/Input/InputCom";
import ButtonCom from "../../components/Button/ButtonCom";
import { useDispatch } from "react-redux";
import { login, logout } from "../../features/userInfoSlice";
import { Link } from "react-router-dom";
import * as ServerApi from "utils/serverApi";
import { readFromLocalStorage } from "utils/localStorageHelpers";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const global_is_logged_in = readFromLocalStorage("is_logged_in");
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(global_is_logged_in);
  const myRef = useRef(null);
  const dispatch = useDispatch();
  var passInputComponent = document.getElementById("user_pass-input");
  var userNameInputComponent = document.getElementById("user_name-input");

  const shakeUserNameInput = function () {
    console.log(userName);

    userNameInputComponent.classList.add("error");
    setTimeout(() => {
      userNameInputComponent.classList.remove("error");
    }, 1200);
  };
  const shakePassInput = function () {
    passInputComponent.classList.add("error");
    setTimeout(() => {
      passInputComponent.classList.remove("error");
    }, 1200);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("user_name-input").value,
      password: document.getElementById("user_pass-input").value,
    };

    await ServerApi.login(data)
      .then((res) => {
        setIsLoggedInLocal(true);
        dispatch(login({ ...res.data, is_logged_in: true }));
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        switch (err.response.status) {
          case 401:
            shakePassInput();
            break;

          case 404:
            shakeUserNameInput();
            break;

          default:
        }
      });
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    var res = await ServerApi.logout();

    if (res.status === 200) {
      setIsLoggedInLocal(false);
      dispatch(logout());
    } else {
      console.log(res);
    }
  };

  return (
    <div className="login-page">
      {isLoggedInLocal ? (
        <div className="logged-in">
          <ButtonCom onClick={handleLogOut} btnValue="LOGOUT"></ButtonCom>
        </div>
      ) : (
        <div className="login-form">
          <div className="login-div" ref={myRef}>
            <form id="login-form">
              <InputCom
                inputType="text"
                placeholder="Email address"
                id="user_name"
                inputId="user_name-input"
                className="input-com"
                setValue={setUserName}
                value={userName}
              />
              <InputCom
                inputType="password"
                placeholder="Password"
                id="user_pass"
                inputId="user_pass-input"
                className="input-com"
                setValue={setPass}
                value={pass}
              />
              <ButtonCom onClick={handleLogin} btnValue="LOGIN"></ButtonCom>
            </form>
            <Link className="new-account-link" to="/register">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
