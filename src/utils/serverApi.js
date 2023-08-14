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
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/auth/logout", null, {
        headers: {
          Authorization: "Bearer " + token,
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

export const isloggedin = (refToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:4000/auth/isloggedin", {
        headers: {
          Authorization: "Bearer " + refToken,
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
  // console.log("sending token: ", token);
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:4000/task/getall", {
        headers: {
          Authorization: "Bearer " + token,
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

export const newtask = (accToken, task) => {
  console.log("sending token: ", accToken);
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/task/create", task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accToken,
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

export const refreshTokens = (refToken) => {
  console.log("sending token: ", refToken);
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/auth/refreshtokens", null, {
        headers: {
          Authorization: "Bearer " + refToken,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
};

export const edittask = (accToken, task) => {
  console.log("sending token: ", accToken);
  return new Promise((resolve, reject) => {
    axios
      .put("http://localhost:4000/task/edit", task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accToken,
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
