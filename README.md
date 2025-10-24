
# JobConnect – Smart Recruitment Platform 🚀

## Overview

**JobConnect** is a full-stack, role-based recruitment platform designed to **seamlessly connect recruiters and job applicants**.

Built with the MERN stack and leveraging modern UI design, it provides tailored dashboards, real-time job posting and tracking, and comprehensive profile management. Recruiters can efficiently post and manage jobs, while applicants can effortlessly explore personalized job recommendations and track their applications.

---

## Features 🧠

JobConnect offers distinct, role-specific features powered by secure **JWT-based authentication** and **role-based routing** to ensure a focused and secure experience for every user.

### 👔 Recruiter Dashboard & Management

This central hub gives recruiters complete control over their hiring process.

* **Job Listing Management:** Post, edit, and manage all active and past job listings.
* **Performance Metrics:** View essential hiring statistics at a glance, including:
    * **Total Jobs Posted:** Count of all active and closed listings.
    * **Total Applicants:** Cumulative number of applications received across all jobs.
    * **Pending Applications:** Applications that are yet to be reviewed.
* **Profile Management:** Edit and update company/recruiter profile information, including contact details and company overview.

---

### 👩‍💻 Applicant Dashboard & Experience

The applicant dashboard is designed for a smooth and effective job search.

* **Job Discovery:** Browse and explore a curated list of **recommended jobs** based on profile details and past interactions.
* **Application Tracking (My Jobs):** Monitor the status of all submitted job applications (e.g., Pending Review, Interview Scheduled) in a dedicated section.
* **Profile Management:** Update and maintain an applicant profile, including resume uploads, professional experience, and skills, to enhance job matching and application quality.

---

### ⚙️ Common Features

* **Secure Authentication:** **JWT (JSON Web Tokens)** based login and signup for robust security.
* **Role-Based Access:** Ensures users only access features and data relevant to their Recruiter or Applicant role.
* **Responsive UI:** A modern, clean, and mobile-friendly interface built with **Tailwind CSS**.
* **Global State Management:** Efficient state handling across the application using **Redux Toolkit**.

---

## Tech Stack 🧱

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, TailwindCSS, Redux Toolkit |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **API Calls** | Axios |

---

## Folder Structure 🗂️

```

JobConnect/
│
├── backend/
│   ├── controllers/      \# Handles request logic (job posting, user stats, etc.)
│   ├── models/           \# Mongoose schemas (User, Job, Application)
│   ├── routes/           \# API endpoint definitions
│   ├── server.js         \# Main server file
│   └── config/           \# Database configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/   \# Reusable UI elements
│   │   ├── pages/        \# Main application views (Dashboard, Login, Apply)
│   │   ├── redux/        \# Redux slices for global state
│   │   ├── apiCalls/     \# Axios configurations and API service functions
│   │   ├── App.jsx       \# Main component and router
│   │   └── main.jsx      \# Entry point
│   └── package.json
│
└── README.md

````

---

## Setup Instructions ⚙️

### 🔹 Backend Setup (Node.js/Express)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/JobConnect.git](https://github.com/your-username/JobConnect.git)
    cd JobConnect/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the `/backend` directory with the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=8000
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The backend API will be running on **`http://localhost:8000`**.

---

### 🔹 Frontend Setup (React.js)

1.  **Navigate to frontend folder:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API URL:**
    Create a file named `.env` in the `/frontend` directory with your backend API URL:
    ```env
    VITE_API_URL=http://localhost:8000
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at **`http://localhost:5173`**.

---

## API Endpoints Overview 🧾

| Method | Endpoint | Description | Requires Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user (Recruiter/Applicant) | No |
| `POST` | `/api/auth/login` | Login for recruiter/applicant | No |
| `POST` | `/api/recruiter/post` | Post a new job listing | Recruiter |
| `PUT` | `/api/recruiter/update/:id` | Edit an existing job listing by ID | Recruiter |
| `GET` | `/api/recruiter/getStats` | Fetch recruiter job/application statistics | Recruiter |
| `GET` | `/api/jobs/recommended` | Get recommended jobs for applicants | Applicant |
| `POST` | `/api/apply/:jobId` | Apply for a specific job by ID | Applicant |

---

## Future Enhancements 🪄

* **👀 View Applicants Page:** Allow recruiters to see detailed profiles of all applicants for a specific job, including their resume and application status.
* **🔔 Notifications System:** Implement real-time or email notifications for applicants regarding job status updates (e.g., accepted, rejected, interview request).
* **🎯 Advanced Filters:** Enhance the job search experience with advanced filtering options by job type, location, salary range, and experience level.
* **💬 In-App Messaging:** Secure and direct communication channel between recruiters and applicants.
* **📊 Analytics Dashboard:** Provide recruiters with detailed performance metrics on job views, application funnel conversion rates, and time-to-hire.
