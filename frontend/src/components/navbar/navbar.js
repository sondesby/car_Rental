import React from "react";
import { NavLink } from 'react-router-dom';
import st from  "./navbar.module.css"

function NavBar() {

  const Token = localStorage.getItem("Token") || sessionStorage.getItem("Token");
  const user = localStorage.getItem("role") || sessionStorage.getItem("role");
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav className="navHeader navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" style={{ fontSize: "20px", fontWeight: "bold" }} className={`nav-link ${st.links}`}>BY-CARS</NavLink>
          </li>
        </ul>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          {Token ?
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex-justify-content-end">
              {user === "admin" ?
              (
                <li className="nav-item">
                  <NavLink style={{ fontSize: "20px", fontWeight: "600" }} to="/dashboard" className={`nav-link ${st.links}`}>Dashboard</NavLink>
                </li>
              ):
              ("")}
              <li className="nav-item">
                <NavLink style={{ fontSize: "20px", fontWeight: "600" }} to="user-interface" className={`nav-link ${st.links}`}>My Collection</NavLink>
              </li>
              <li className="nav-item">
                <NavLink style={{ fontSize: "20px", fontWeight: "600" }} to="/profile" className={`nav-link ${st.links}`}>Profile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink style={{ fontSize: "20px", fontWeight: "600" }} onClick={logout} className={`nav-link ${st.links} ${st.logout}`}>Logout</NavLink>
              </li>
            </ul>
            :
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex-justify-content-end">
              <li className="nav-item">
                <NavLink style={{ fontSize: "20px", fontWeight: "600" }} to="/register" className={`nav-link ${st.links}`}>Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink style={{ fontSize: "20px", fontWeight: "600" }} to="/login" className={`nav-link ${st.links}`}>Login</NavLink>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
