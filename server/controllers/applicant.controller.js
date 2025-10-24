import Application from "../models/applicant.model.js";
import Job from "../models/job.model.js";
import { Applicant, User } from "../models/user.model.js";


//get all jobs

export const getAllJObs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "recruiter",
      "name email companyName skillsRequired"
    );
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
      .populate("job")
      .populate("applicant", "name email");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

//withdraw application
export const withdrawApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.applicant.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await application.deleteOne();
    res.status(200).json({ message: "Application withdrawn successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
