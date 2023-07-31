/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import "./login.css";
import InputCom from "../../components/Input/InputCom";
import ButtonCom from "../../components/Button/ButtonCom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/userInfoSlice";
import { Link } from "react-router-dom";
import SnackBar from "components/SnackbarMUI/SnackBar";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const myRef = useRef(null);

  const userInfo = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();

  var passInputComponent = document.getElementById("user_pass-input");
  var userNameInputComponent = document.getElementById("user_name-input");

  var shakeUserNameInput = function () {
    userNameInputComponent.classList.add("error");
    setTimeout(() => {
      userNameInputComponent.classList.remove("error");
    }, 3000);
  };
  var shakePassInput = function () {
    passInputComponent.classList.add("error");
    setTimeout(() => {
      passInputComponent.classList.remove("error");
    }, 3000);
  };

  // withCredentials = giving access to the server to read cookies etc.
  useEffect(() => {
    const loginDiv = myRef.current;
    axios({
      url: "http://localhost:4000/user/userinfo",
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          loginDiv.classList.add("hidden");
          dispatch(login({ ...res.data, is_logged_in: true }));
        } else {
          loginDiv.classList.remove("hidden");
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    setLoggedIn(userInfo.is_logged_in);
  }, [userInfo]);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("user_name-input").value,
      password: document.getElementById("user_pass-input").value,
    };
    axios
      .post("http://localhost:4000/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(login({ ...res.data, is_logged_in: true }));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          shakePassInput();
        }
        if (err.response.status === 404) {
          shakeUserNameInput();
        }
        console.log(err.response.data);
      });
  };

  const handleLogOut = (e) => {
    e.preventDefault();

    axios({
      url: "http://localhost:4000/user/logout",
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        setLoggedIn(false);
        dispatch(logout());
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="login-page">
      {loggedIn ? (
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
            <Link
              // style={{ color: "inherit" }}
              className="new-account-link"
              to="/register"
            >
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      )}
      <SnackBar />
    </div>
  );
}
