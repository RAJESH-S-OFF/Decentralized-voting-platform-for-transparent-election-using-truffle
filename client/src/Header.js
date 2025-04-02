import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Header.css";

const Header = ({ loginStatus, userLogin }) => {
  return (
    <div className="bg-success text-white py-3 shadow-sm sticky" >
      <div className="container d-flex justify-content-between align-items-center">
          
        <h1 className="fs-4 fw  mb-0"> E-Voting DApp </h1>

        <nav className="d-flex gap-4">
          <Link to="/" className="text-white text-decoration-none hover-scale">
            <i className="fa fa-home" aria-hidden="true">
              {" "}
            </i>{" "}
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-decoration-none hover-scale"
          >
            <i className="fa fa-info-circle" aria-hidden="true">
              {" "}
            </i>{" "}
            About
          </Link>
          <Link
            to="/vote"
            className={`text-white text-decoration-none hover-scale ${
              loginStatus ? "not-hidden" : "hidden"
            }`}
          >
            <i className="fa fa-hand-pointer" aria-hidden="true"></i> Vote
          </Link>
          <Link
            to="/results"
            className="text-white text-decoration-none hover-scale"
          >
            <i className="fa fa-trophy" aria-hidden="true"></i> Results
          </Link>
          <Link
            to="/adminlogin"
            className="text-white text-decoration-none hover-scale"
          >
            <i className="fa fa-user-shield" aria-hidden="true"></i> Admin
          </Link>
          <Link
            to="/profile"
            className={`text-white text-decoration-none hover-scale ${
              loginStatus ? "not-hidden" : "hidden"
            }`}
          >
            <i className="fa fa-user" aria-hidden="true"></i> Profile
          </Link>
          <span
            onClick={userLogin}
            className="text-white text-decoration-none hover-scale"
            style={{ cursor: "pointer" }}
          >
            <i
              className={`fa ${
                loginStatus ? "fa-sign-out-alt" : "fa-sign-in"
              } login-logout-icon`}
              aria-hidden="true"
            ></i>
            {loginStatus ? " Logout" : " Login"}
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Header;

