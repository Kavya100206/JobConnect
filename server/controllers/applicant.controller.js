import Application from "../models/applicant.model.js";
import Job from "../models/job.model.js";
import { Applicant, User } from "../models/user.model.js";


//get all jobs

export const getAllJObs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "recruiter",
      "name email company"
    );
    console.log(jobs);
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    //check if already applied
    const existingApplication = await Application.findOne({
      applicant: req.userId,
      job: jobId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    const newApplication = await Application.create({
      applicant: req.userId,
      job: jobId,
    });
    res
      .status(201)
      .json({ message: "Applied successfully", application: newApplication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get my applications
export const getMyApplications = async (req, res) => {
  try {
   const applications = await Application.find({ applicant: req.userId })
  .populate({
    path: "job",
    populate: {
      path: "recruiter",
      select: "company name email", // whatever fields you need
    },
  })
  .populate("applicant", "name email");

  const validApps = applications.filter(app => app.job !== null);

    // 🎯 The FIX: Map the array to extract ONLY the 'job' object from each application
    const appliedJobs = validApps.map(app => ({
      applicationId: app._id,
      status: app.status,
      appliedAt: app.appliedAt,
      job: app.job  // contains full job object
    }));

    // Send the array of job objects
    res.status(200).json(appliedJobs);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

//withdraw application
export const withdrawApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.userId;
const application = await Application.findOne({
      job: jobId,
      applicant: userId,
    });    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.applicant.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await application.deleteOne();
    res.status(200).json({ message: "Application withdrawn successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

//edit applicant profile

export const updateUserprofile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, skills, resume } = req.body;

    const updatedUser = await Applicant.findByIdAndUpdate(
      userId,
      { name, skills, resume },
      { new: true } // return updated user
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Save a job for applicant
export const saveJob = async (req, res) => {
  try {
    console.log(req.userId)
    const applicantId = req.userId; // assuming auth middleware
    console.log("Params:", req.params);

    const jobId = req.params.jobId;
    // ✅ NEW, SAFE LINE (using the variables you've already defined)
console.log("SAVE JOB hit!", applicantId, jobId);

    const applicant = await Applicant.findById(applicantId);

    if (!applicant) return res.status(404).json({ message: "Applicant not found" });

    // Initialize savedJobs if not present
    if (!applicant.savedJobs) applicant.savedJobs = [];

    // Check if already saved
    if (applicant.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job already saved" });
    }

    applicant.savedJobs.push(jobId);
    await applicant.save();

    const job = await Job.findById(jobId);
    res.status(200).json({ message: "Job saved successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Unsave a job
export const unsaveJob = async (req, res) => {
  try {
    const applicantId = req.userId;
    const jobId = req.params.jobId;

    const applicant = await Applicant.findById(applicantId);
    if (!applicant || !applicant.savedJobs) {
      return res.status(404).json({ message: "Applicant or saved jobs not found" });
    }

    applicant.savedJobs = applicant.savedJobs.filter((id) => id.toString() !== jobId);
    await applicant.save();

    res.status(200).json({ message: "Job removed from saved jobs" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all saved jobs
export const getSavedJobs = async (req, res) => {
  try {
    const applicantId = req.userId;

    const applicant = await Applicant.findById(applicantId).populate("savedJobs");
    if (!applicant) return res.status(404).json({ message: "Applicant not found" });

    res.status(200).json({ savedJobs: applicant.savedJobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



