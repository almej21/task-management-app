/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
// its critical to use the is_logged_in value from the local storage only
//for rendering data that is not private.
import { readFromLocalStorage } from "utils/localStorageHelpers";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // this useState is for tracking the loggedIn state,
  // if it changes then refresh the navbar and update
  // the LOGIN and LOGOUT string accordingly.
  const loggedIn = useSelector((state) => state.userInfo.value.is_logged_in);

  return (
    <div className="Navbar">
      <span className="nav-logo">TASK MANAGEMENT</span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <li className="active ">
          <Link className="link" to="/login">
            {readFromLocalStorage("is_logged_in") ? "LOGOUT" : "LOGIN"}
          </Link>
        </li>
        <li>
          <Link className="link" to="/tasks">
            TASKS
          </Link>
        </li>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
