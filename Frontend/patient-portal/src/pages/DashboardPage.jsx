import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2 className="mb-4 text-center">Welcome to Patient Dashboard</h2>

          <div className="dashboard-card bg-info" onClick={() => navigate("/upload")}>
            <h4><i className="fa-solid fa-file-arrow-up"></i> Upload Document</h4>
            <p >Submit your medical PDFs securely.</p>
          </div>

          <div className="dashboard-card bg-info" onClick={() => navigate("/documents")}>
            <h4><i className="fa-solid fa-file-lines"></i> View Documents</h4>
            <p>Browse and download your uploaded files.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardPage;
