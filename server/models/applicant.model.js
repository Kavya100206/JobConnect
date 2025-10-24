import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    applicant : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    job : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required : true
    },
    status : {
        type : String,
        enum :["Pending", "Accepted", "Rejected"],
        default : "Pending"
    },
    appliedAt: {
    type: Date,
    default: Date.now,
  },
} , {timestamps : true});

const Application = mongoose.model('Application' , applicantSchema);
export default Application;