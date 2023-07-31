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
import * as ServerApi from "utils/serverApi";

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

  // const loginDiv = myRef.current;
  // loginDiv.classList.add("hidden");
  // loginDiv.classList.remove("hidden");
  // withCredentials = giving access to the server to read cookies etc.
  useEffect(() => {
    async function fetchUserInfo() {
      await ServerApi.getuserinfo()
        .then((res) => {
          dispatch(login({ ...res.data, is_logged_in: true }));
        })
        .catch((err) => {
          dispatch(logout());
        });
    }
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setLoggedIn(userInfo.is_logged_in);
  }, [userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("user_name-input").value,
      password: document.getElementById("user_pass-input").value,
    };

    await ServerApi.login(data)
      .then((res) => {
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
      setLoggedIn(false);
      dispatch(logout());
    } else {
      console.log(res);
    }
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
