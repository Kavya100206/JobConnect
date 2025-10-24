import { User } from "../models/user.model.js";

// ✅ Middleware to check if user is a recruiter
export const isRecruiter = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied. Recruiter only." });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Middleware to check if user is an applicant
export const isApplicant = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "applicant") {
      return res.status(403).json({ message: "Access denied. Applicant only." });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
