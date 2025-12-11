import mongoose from "mongoose";

const options = { timestamps: true, discriminatorKey: "role" };

// Base User schema (common fields)
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  options
);


// Applicant schema (inherits from User)
const applicantSchema = new mongoose.Schema({
  skills: { type: [String], required: true },
  resume: { type: String, required: true },
  experience: {
  type: Number, // in years
  required: true
},
savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to your Job model
    },
  ],
});


// Recruiter schema (inherits from User)
const recruiterSchema = new mongoose.Schema({
  company: { type: String, required: true },
  location: { type: String, required: true },
});



const User = mongoose.model("User", userSchema);
const Applicant = User.discriminator("applicant", applicantSchema);
const Recruiter = User.discriminator("recruiter", recruiterSchema);

export  { User, Applicant, Recruiter };
