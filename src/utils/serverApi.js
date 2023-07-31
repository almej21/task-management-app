import axios from "axios";

export const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: "http://localhost:4000/user/logout",
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getuserinfo = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: "http://localhost:4000/user/userinfo",
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        reject(err.response.data);
      });
  });
};
