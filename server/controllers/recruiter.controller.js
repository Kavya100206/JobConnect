import Application from "../models/applicant.model.js";
import Job from "../models/job.model.js";
import { Recruiter } from "../models/user.model.js";

//post a job

export const createJob = async (req, res) => {
  const {
    title,
    description,
    skillsRequired,
    location,
    salary,
    jobType,
    workMode,
  } = req.body;

  try {
    //checking all required fields are present
    if (
      !title ||
      !description ||
      !skillsRequired ||
      !location ||
      !salary ||
      !jobType ||
      !workMode
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //create a new job
    const skillsArray = Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired.split(",").map((skill) => skill.trim());

    const newJob = await Job.create({
      title,
      description,
      skillsRequired: skillsArray,
      location,
      salary,
      jobType,
      workMode,
      recruiter: req.userId,
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get recruiters jobs
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.recruiter.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(job, req.body);
    await job.save();
    res.status(200).json({ message: "Job updated successfully", job:job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.recruiter.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all applicants for a job
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    //check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applications = await Application.find({ job: jobId }).populate(
      "applicant",
      "name email skills resume"
    );
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    //confirming the user is a recruiter
    const { applicationId } = req.params;
    const { status } = req.body;

    //check if application exists
    const application = await Application.findById(applicationId).populate(
      "job"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (!["Accepted", "Rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    //check if the job belongs to the recruiter
    if (application.job.recruiter.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    application.status = status;
    await application.save();
    res
      .status(200)
      .json({
        message: "Application status updated successfully",
        application,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//edit recruiter profile

export const updateRecruiterProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, company, location } = req.body;

    const updatedUser = await Recruiter.findByIdAndUpdate(
      userId,
      { name, company, location },
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



//recruiter stats

export const getRecruiterStats = async (req, res) => {
  try {
    const recruiterId = req.userId; // from auth middleware

    // 1. Get all jobs for this recruiter
    const jobs = await Job.find({ recruiter: recruiterId }).select("_id");
    const jobIds = jobs.map(job => job._id);

    // 2. Count total applicants
    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds }
    });

    // 3. Count by status
    const pending = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Pending"
    });
    const accepted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted"
    });
    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Rejected"
    });

    // 4. Send response
    res.status(200).json({
      totalApplicants,
      pending,
      accepted,
      rejected
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

