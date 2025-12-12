import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Email service configuration error:", error);
    } else {
        console.log("✅ Email service is ready to send messages");
    }
});

// Send email function
export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `JobConnect <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, error: error.message };
    }
};

export default transporter;
