# Assignment_ANI8LABS

## Project Overview

This portal enables users to:

-  Upload medical documents (PDF only)
-  View all uploaded files
-  Download any document
-  Delete documents when no longer needed

All files are stored locally in an `uploads/` folder, and metadata is saved in a MySQL database.

The application includes:

- A **React frontend** with:
  - Form to upload PDF files
  - List of uploaded documents
  - Download and delete buttons
  - Success/failure message display

- A **Spring Boot backend** with REST APIs to:
  - Upload PDF files
  - List all uploaded files
  - Download a specific file
  - Delete a file

- A **MySQL database** to store metadata:
  - Filename
  - File size
  - Upload timestamp
