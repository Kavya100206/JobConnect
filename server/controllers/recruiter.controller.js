import Application from "../models/applicant.model.js";
import Job from "../models/job.model.js";
import { Recruiter } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { sendEmail } from "../services/email.service.js";
import { applicationAcceptedTemplate, applicationRejectedTemplate } from "../utils/emailTemplates.js";
import Notification from "../models/notification.model.js";

//post a job

export const createJob = async (req, res) => {
  const {
    title,
    description,
    skillsRequired,
    minExperience,
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
      !minExperience ||
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
      minExperience,
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
    res.status(200).json({ message: "Job updated successfully", job: job });
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



//edit recruiter profile

export const updateRecruiterProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, company, location, email } = req.body;

    // Prepare update object
    const updateData = { name, company, location, email };

    // If a file is uploaded, upload to Cloudinary
    if (req.file) {
      // Convert buffer to base64
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        folder: "jobconnect/profile-pictures",
        resource_type: "image",
      });

      // Add Cloudinary URL to update data
      updateData.profilePicture = uploadResponse.secure_url;
    }

    const updatedUser = await Recruiter.findByIdAndUpdate(
      userId,
      updateData,
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
    const jobs = await Job.find({ recruiter: recruiterId }).select("_id title jobType workMode");

    if (!jobs.length) {
      return res.status(200).json({
        totalApplicants: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        workModeCounts: {
          fullTime: 0,
          partTime: 0,
          contract: 0,
        },
        acceptedJobTypeCounts: {
          fullTime: 0,
          partTime: 0,
          contract: 0,
        },
        applicantsPerJob: []
      });
    }

    const jobIds = jobs.map(job => job._id);

    // 2️⃣ GET ACCEPTED APPLICATIONS + POPULATE JOB TYPE
    const acceptedApplications = await Application.find({
      job: { $in: jobIds },
      status: "Accepted"
    }).populate("job", "jobType");

    // 3️⃣ Count job types among ACCEPTED applicants
    const acceptedJobTypeCounts = {
      fullTime: acceptedApplications.filter(
        (app) => app.job?.jobType === "full-time"
      ).length,

      partTime: acceptedApplications.filter(
        (app) => app.job?.jobType === "part-time"
      ).length,

      contract: acceptedApplications.filter(
        (app) => app.job?.jobType === "contract"
      ).length,
    };


    // 4️⃣ Count total applicants
    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds }
    });

    // 5️⃣ Count by status
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

    // 6️⃣ Count work modes among posted jobs
    const jobTypeCOunts = {
      fullTime: jobs.filter((j) => j.jobType?.toLowerCase() === "full-time").length,
      partTime: jobs.filter((j) => j.jobType?.toLowerCase() === "part-time").length,
      contract: jobs.filter((j) => j.jobType?.toLowerCase() === "contract").length,
    };

    // 7️⃣ Applicants per job (bar chart)
    const applicantsPerJob = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ job: job._id });
        return {
          job: job.title,
          applicants: count,
        };
      })
    );

    // 8️⃣ Send response
    res.status(200).json({
      totalApplicants,
      pending,
      accepted,
      rejected,
      jobTypeCOunts,
      acceptedJobTypeCounts,  // ⭐ NEW STAT ADDED HERE
      applicantsPerJob
    });

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
      "name email skills resume experience"
    )
      .populate("job", "title");
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};


//updateStatus

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId)
      .populate("applicant", "name email")
      .populate({
        path: "job",
        populate: {
          path: "recruiter",
          select: "name email company"
        }
      });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    // Send email to applicant based on status (non-blocking)
    if (application.applicant && application.applicant.email) {
      const emailTemplate = status === "Accepted"
        ? applicationAcceptedTemplate(
          application.applicant.name,
          {
            title: application.job.title,
            location: application.job.location,
            workMode: application.job.workMode,
          },
          {
            company: application.job.recruiter.company,
            email: application.job.recruiter.email,
          }
        )
        : applicationRejectedTemplate(
          application.applicant.name,
          {
            title: application.job.title,
          },
          {
            company: application.job.recruiter.company,
          }
        );

      const emailSubject = status === "Accepted"
        ? `Congratulations! Application Accepted for ${application.job.title}`
        : `Application Status Update - ${application.job.title}`;

      sendEmail(
        application.applicant.email,
        emailSubject,
        emailTemplate
      ).catch((error) => console.error("Email error (non-critical):", error));
    }

    // Create notification for applicant
    await Notification.create({
      user: application.applicant._id,
      type: status === "Accepted" ? "application_accepted" : "application_rejected",
      message: `Your application for ${application.job.title} has been ${status.toLowerCase()}`,
      relatedJob: application.job._id,
      relatedApplication: applicationId,
    }).catch((error) => console.error("Notification error (non-critical):", error));

    res.status(200).json({ message: "Application status updated successfully", application });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



export const getApplicantsForRecruiter = async (req, res) => {
  try {
    const recruiterId = req.userId;

    // 1️⃣ Get all job IDs posted by this recruiter
    const jobs = await Job.find({ recruiter: recruiterId }).select("_id");

    const jobIds = jobs.map(job => job._id);

    if (jobIds.length === 0) {
      return res.status(200).json([]); // no jobs → no applicants
    }

    // 2️⃣ Find all applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("job")        // get job title, description, etc.
      .populate("applicant"); // get applicant name, email, skills

    // 3️⃣ Return them
    res.status(200).json(applications);

  } catch (error) {
    console.error("Error fetching recruiter applicants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



