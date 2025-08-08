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
 
## How to Run It Locally

Follow these steps to run the full-stack application on your local machine.

---

## Backend Setup (Spring Boot + MySQL)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/patient-portal.git
   cd patient-portal/backend
   ```

2. **Create a MySQL database**
   - Open **MySQL Workbench**
   - Create a new schema named:
     ```
     patient_portal
     ```

3. **Configure database connection in `application.properties`**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/patient_portal
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update
   ```

4. **Run the backend**
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start at: `http://localhost:8080`


## Frontend Setup (React + Vite)

1. **Navigate to the frontend folder**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React app**
   ```bash
   npm run dev
   ```
   The frontend will run at: `http://localhost:5173` (default Vite port)

