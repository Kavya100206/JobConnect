import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["application_received", "application_accepted", "application_rejected"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        relatedJob: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        relatedApplication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
