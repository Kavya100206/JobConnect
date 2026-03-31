// config.js
export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8081" // local backend
    : "https://jobconnect-1-7ob1.onrender.com"; // deployed backend
