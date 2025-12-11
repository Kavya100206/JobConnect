// config.js
export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8081" // local backend
    : "https://jobconnect-roeu.onrender.com"; // deployed backend
