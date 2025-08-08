import React from "react";
import "../css/Navbar.css";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-info navbar-dark px-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Patient Portal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link " aria-current="page" href="/">
                <i className="fas fa-home"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="/upload">
                Form Upload
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="/documents">
                List of Medical Docs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
