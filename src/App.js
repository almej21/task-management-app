/* eslint-disable jsx-a11y/alt-text */
import SnackBar from "components/SnackbarMUI/SnackBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "routes/login/Login";
import Register from "routes/register/Register";
import Tasks from "routes/tasks/Tasks";
import "./App.css";
import Navbar from "./navbar/Navbar";

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
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
