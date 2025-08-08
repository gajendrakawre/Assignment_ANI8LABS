import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/DocumentListPage.css";

function DocumentListPage() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/documents/")
      .then((res) => setDocuments(res.data))
      .catch(() => setError("Failed to load documents."));
  }, []);

const handleDownload = (id, filename) => {
  axios
    .get(`http://localhost:8080/documents/${id}`, {
      responseType: "blob",
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(() => setError("Download failed."));
};

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${id}"?`
    );
    if (!confirmed) return;

    axios
      .delete(`http://localhost:8080/documents/${id}`)
      .then((res) => {
        alert(res.data.message);
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      })
      .catch(() => {
        alert("Failed to delete document.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="document-gallery container py-5">
        <h4 className="text-center mb-4 text-info">Your Uploaded PDFs</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          {documents.length === 0 ? (
            <div className="col-12 text-center text-info">
              <p>No files found. Upload a document to get started!</p>
            </div>
          ) : (
            documents.map((doc) => (
              <div className="col-md-3 mb-4" key={doc.id}>
                <div className="card document-card text-center text-white bg-info">
                  <div className="pdf-icon">
                    <i className="fa-solid fa-file-pdf"></i>
                  </div>
                  <h6 className="mt-2">{doc.filename}</h6>
                  <div className="icon-buttons mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleDownload(doc.id, doc.filename)}
                    >
                      <i className="fa-solid fa-download"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DocumentListPage;
