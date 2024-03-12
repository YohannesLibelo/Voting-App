import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logoo.png";
import VotingChart from "./VotingResults";
const Header = ({ isLoggedIn, handleSignOut, handleViewResults }) => {
  return (
    <div className="header container-fluid bg-white">
      <div id="menu-jk" className="nav-col text-white shadow-md mb-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-2 pb-2 align-items-center">
              <Link to="/">
                <img className="max-230 mt-2" src={logo} alt="" />
              </Link>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#menu"
                className="float-end text-dark d-lg-none pt-1 ps-3"
              >
                <i className="bi pt-1 fs-1 cp bi-list"></i>
              </a>
            </div>
            <div id="menu" className="col-lg-12 d-none d-lg-block">
              <ul className="float-end mul d-inline-block">
                <li className="float-md-start px-4 pe-1 py-3">
                  <button
                    className="btn fw-bold fs-8 btn-outline-primary px-5"
                    onClick={handleViewResults}
                  >
                    View Result
                  </button>
                </li>
                {!isLoggedIn && (
                  <>
                    <li className="float-md-start px-4 pe-1 py-3">
                      <Link to="/login">
                        <button className="btn fw-bold fs-8 btn-outline-primary px-5">
                          Log in
                        </button>
                      </Link>
                    </li>
                    <li className="float-md-start px-4 pe-1 py-3">
                      <Link to="/register">
                        <button className="btn fw-bold fs-8 btn-outline-primary px-5">
                          Register
                        </button>
                      </Link>
                    </li>
                    <li className="float-md-start px-4 pe-1 py-3">
                      <Link to="/help">
                        <button className="btn fw-bold fs-8 btn-outline-primary px-5">
                          Help
                        </button>
                      </Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <li className="float-md-start px-4 pe-1 py-3">
                    <button
                      className="btn fw-bold fs-8 btn-outline-primary px-5"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
