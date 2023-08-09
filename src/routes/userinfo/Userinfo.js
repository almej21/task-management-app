/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/userInfoSlice";
import axios from "axios";
import { readFromLocalStorage } from "utils/localStorageHelpers";
import * as dateHelpers from "utils/dateHelpers";
import "./userinfo.scss";

export default function Userinfo() {
  const userInfo = useSelector((state) => state.userInfo.value);
  const isLoggedIn = readFromLocalStorage("is_logged_in");
  const dispatch = useDispatch();
  const member_since = dateHelpers.formatDateToDDMMYYYY(
    new Date(userInfo.member_since)
  );

  useEffect(() => {
    axios({
      url: "http://localhost:4000/user/userinfo",
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(login({ ...res.data, is_logged_in: true }));
          console.log("res: ", res.data);
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      });
  }, []);

  return (
    <div className="userinfo-div">
      {!isLoggedIn ? (
        <div className="logged-out-user-info">
          <h1 className="title">Please Login to view Info</h1>
        </div>
      ) : (
        <div className="logged-in-user-info">
          <h1>User name: {userInfo.user_name}</h1>
          <h2>Email: {userInfo.email}</h2>
          <h2>{`Member since: ${member_since}`}</h2>
          <h2>ID: {userInfo._id}</h2>
          <h2>Points: {userInfo.points}</h2>
        </div>
      )}
    </div>
  );
}
