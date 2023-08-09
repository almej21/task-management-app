/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import React from "react";
import Navbar from "./navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SnackBar from "components/SnackbarMUI/SnackBar";
import Login from "routes/login/Login";
import Fixturesplay from "routes/fixturesplay/Fixturesplay";
import Userinfo from "routes/userinfo/Userinfo";
import Register from "routes/register/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <SnackBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fixturesplay" element={<Fixturesplay />} />
          <Route path="/userinfo" element={<Userinfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
