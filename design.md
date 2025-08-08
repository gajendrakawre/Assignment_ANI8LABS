# 1. Tech Stack Choices

## Q1. What frontend framework did you use and why?

I used **React** for the frontend. React's component-based architecture made it easy to build reusable UI elements, and its strong community support helped me troubleshoot issues quickly. I also liked how React handles state management and routing with libraries like React Router.

## Q2. What backend framework did you choose and why?

I went with **Express.js** for the backend. It's lightweight, fast, and works seamlessly with Node.js. Express gave me full control over routing and middleware, and it was easy to set up RESTful APIs for my document upload and retrieval features.

## Q3. What database did you choose and why?

I used **MySQL**, managed through **MySQL Workbench**. I chose MySQL because it's reliable, well-documented, and supports relational data well. MySQL Workbench made it easy to visualize and manage my tables, and I was already familiar with SQL syntax, which helped speed up development.

## Q4. If you were to support 1,000 users, what changes would you consider?

To scale for 1,000 users, I’d make the following improvements:

- **Database Optimization**: Switch to a cloud-hosted MySQL instance (like AWS RDS) and add indexing for faster queries.
- **File Storage**: Move file uploads to cloud storage like AWS S3 instead of local disk.
- **Backend Scaling**: Deploy the Express server using a platform like Heroku or AWS EC2 with load balancing.
- **Frontend Optimization**: Use a CDN to serve static assets and enable caching.
- **Security Enhancements**: Add authentication (JWT or OAuth), rate limiting, and input validation to handle concurrent users safely.

# 2. Architecture Overview

## System Flow Description

- The **React frontend** provides the user interface for uploading, listing, downloading, and deleting PDF documents.
- It communicates with the **Spring Boot backend** using REST API calls.
- The **Spring Boot backend** handles all business logic and routes:
  - Saves uploaded files to the **local file system**
  - Stores metadata (like filename, path, and ID) in the **MySQL database**
  - Retrieves file info and serves files for download
  - Deletes files and their metadata when requested
- The **MySQL database** stores document metadata.
- The **file system** stores the actual PDF files.

# 3. API Specification

### Below are the required API endpoints used in the project:

- ### **Upload a PDF**

  - **URL:** `/documents/upload`
  - **Method:** `POST`
  - **Request:** Multipart form-data containing the PDF file
  - **Response:**
    ```json
    {
      "status": "success",
      "filename": "example.pdf"
    }
    ```
  - **Description:** Uploads a PDF file to the server and stores its metadata in the database.

- ### **List All Documents**

  - **URL:** `/documents`
  - **Method:** `GET`
  - **Response:**
    ```json
    [
      {
        "id": 1,
        "filename": "example.pdf",
        "path": "/files/example.pdf"
      },
      {
        "id": 2,
        "filename": "report.pdf",
        "path": "/files/report.pdf"
      }
    ]
    ```
  - **Description:** Returns a list of all uploaded documents with their metadata.

- ### **Download a File**

  - **URL:** `/documents/{id}`
  - **Method:** `GET`
  - **Response:** PDF file stream (application/pdf)
  - **Description:** Downloads the PDF file associated with the given document ID.

- ### **Delete a File**
  - **URL:** `/documents/{id}`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Document deleted successfully."
    }
    ```
  - **Description:** Deletes the PDF file from the server and removes its metadata from the database.

# 4. 🔁 Data Flow Description

## Q5. What happens when a file is uploaded?

1. The user selects a PDF file using the React frontend.
2. The frontend sends a `POST` request to `/documents/upload` with the file in form-data format.
3. The Spring Boot backend receives the request and:
   - Checks if a file with the same name already exists (duplicates are not allowed).
   - Saves the file to a designated folder on the server.
   - Extracts metadata such as filename and file path.
   - Stores the metadata in a MySQL database table.
4. The backend responds with a success message and the stored filename.
5. The frontend updates the document list to reflect the new upload.

## What happens when a file is downloaded?

1. The user clicks on a document to download.
2. The frontend sends a `GET` request to `/documents/{id}`.
3. The backend queries the MySQL database to retrieve the file path using the document ID.
4. The backend reads the file from the designated folder.
5. The file is streamed back to the frontend as a downloadable PDF.

# 5. 📌 Assumptions

## Q6. What assumptions did you make while building this?

- Only **PDF files** are allowed for upload.
- Maximum file size is limited to **10MB**.
- No login or registration is required — the app is designed for a **single user**.
- Duplicate filenames are **not allowed**; the backend checks for existing files before saving.
- Uploaded files are stored in a **specific folder** on the server.
- Metadata (filename, path, ID) is stored in a **MySQL database table**.
- No concurrency handling — the app assumes one user interacting at a time.
- Basic error handling is implemented for invalid uploads and missing files.
