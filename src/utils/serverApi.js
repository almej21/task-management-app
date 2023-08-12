import axios from "axios";

// withCredentials = giving access to the server to read cookies etc.

export const signin = (data) => {
  const reqData = {
    email: data.email,
    password: data.password,
  };
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/auth/signin", reqData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signup = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/auth/signup", data, {
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

export const logout = (token) => {
  const accToken = "Bearer " + token;
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/auth/logout", null, {
        headers: {
          Authorization: accToken,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// export const getuserinfo = () => {
//   return new Promise((resolve, reject) => {
//     axios({
//       url: "http://localhost:4000/user/userinfo",
//       method: "GET",
//       withCredentials: true,
//     })
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         console.log(err);
//         reject(err);
//       });
//   });
// };

export const alltasks = (token) => {
  const accToken = "Bearer " + token;
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:4000/task/getall", null, {
        headers: {
          Authorization: accToken,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
