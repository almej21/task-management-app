/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import React from "react";
import Navbar from "./navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./routes/login/Login";
// import Register from "./pages/register/Register";
// import ImHungry from "./pages/ImHungry/ImHungry";
// import Userinfo from "./pages/userinfo/Userinfo";
// import Restaurant from "./pages/restaurant/Restaurant";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/imhungry" element={<ImHungry />} />
          <Route path="/userinfo" element={<Userinfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurant/:id" element={<Restaurant />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
