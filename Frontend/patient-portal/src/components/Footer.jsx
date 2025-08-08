import React from "react";
import '../css/Navbar.css'

function Footer() {
  return (
    <div className="card text-center bg-info px-5 footer-bottom">
     
      <div className="card-body bg-info">
        <h5 className="card-title text-white">Secure Document Management</h5>
        <p className="card-text text-white">
          A healthcare platform where patients can upload, view, download, and manage their medical documents — including prescriptions, test results, and referral notes.
        </p>
      </div>
      <div className="card-footer text-white">
        &copy; {new Date().getFullYear()} Patient Portal | All rights reserved
      </div>
    </div>
  );
}

export default Footer;
