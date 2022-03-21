import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { showAlert } = context;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showAlert("success", "Logout successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            iNoteBook
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <form>
                <NavLink className="btn btn-info mx-1" to="/login">
                  Login
                </NavLink>
                <NavLink className="btn btn-info mx-1" to="/signup">
                  Signup
                </NavLink>
              </form>
            ) : (
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
