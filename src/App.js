/* eslint-disable jsx-a11y/alt-text */
import SnackBar from "components/SnackbarMUI/SnackBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AllTasks from "routes/alltasks/AllTasks";
import EditTask from "routes/edittask/EditTask";
import Login from "routes/login/Login";
import NewTask from "routes/newtask/NewTask";
import Register from "routes/register/Register";
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
          <Route path="/alltasks" element={<AllTasks />} />
          <Route path="/newtask" element={<NewTask />} />
          <Route path="/edittask/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
