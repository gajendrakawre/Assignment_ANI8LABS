import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/UploadPage.css";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setMessage("");
      setError("");
    } else {
      setError("Only PDF files are allowed.");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage(`✅ Upload successful: ${response.data.filename}`);
        setFile(null);
        fileInputRef.current.value = null; // Reset file input
        setError("");
      }
    } catch (error) {
      const backendMessage =
        error.response?.data || "Upload failed due to server error.";
      setError(`❌ ${backendMessage}`);
      setMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-page d-flex justify-content-center align-items-center">
        <div className="card upload-card shadow p-4 bg-info">
          <h4 className="mb-3 text-center text-white">
            Upload Medical Document (PDF Only)
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <button type="submit" className="btn btn-warning w-100">
              Upload
            </button>
          </form>
          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UploadPage;
