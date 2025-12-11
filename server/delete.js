import mongoose from "mongoose";
import Job from "./models/job.model.js"; // adjust path if needed

const MONGO_URI = "mongodb+srv://kavya:xbgOgqTB7j8dVYwS@cluster0.ex2se96.mongodb.net/jobConnect?retryWrites=true&w=majority&appName=Cluster0";

const deleteJobs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const result = await Job.deleteMany({});
    console.log(`${result.deletedCount} jobs deleted successfully!`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error deleting jobs:", error);
  }
};

deleteJobs();
