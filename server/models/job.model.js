import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title : {
        type :String,
        required:true
    },
    description : {
        type : String,
        required:true
    },
    skillsRequired : {
        type : [String],
        required:true
    },
    location : {
        type : String,
        required:true
    },
    salary: {
        type : Number,
        required:true
    },
    jobType : {
        type : String,
        enum : ['full-time' , 'part-time' , 'contract'],
        required:true
    },
    workMode : {
        type : String,
        enum : ['onsite' , 'hybrid' , 'remote'],
        required:true
    },
    recruiter : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps:true});

const Job = mongoose.model('Job' , jobSchema);
export default Job;