// HTML Email Templates

// Template for when applicant applies for a job (sent to recruiter)
export const applicationReceivedTemplate = (applicantData, jobData) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #667eea; border-radius: 5px; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .btn { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New Job Application Received!</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>You have received a new application for the position of <strong>${jobData.title}</strong>.</p>
          
          <div class="info-box">
            <h3>📋 Applicant Details</h3>
            <p><span class="label">Name:</span> ${applicantData.name}</p>
            <p><span class="label">Email:</span> ${applicantData.email}</p>
            <p><span class="label">Skills:</span> ${applicantData.skills ? applicantData.skills.join(", ") : "Not specified"}</p>
            <p><span class="label">Experience:</span> ${applicantData.experience || 0} years</p>
            ${applicantData.resume ? `<p><span class="label">Resume:</span> <a href="${applicantData.resume}" target="_blank">View Resume</a></p>` : ""}
          </div>

          <div class="info-box">
            <h3>💼 Job Details</h3>
            <p><span class="label">Position:</span> ${jobData.title}</p>
            <p><span class="label">Location:</span> ${jobData.location}</p>
            <p><span class="label">Work Mode:</span> ${jobData.workMode}</p>
            <p><span class="label">Job Type:</span> ${jobData.jobType}</p>
          </div>

          <p>Please review the application and take appropriate action.</p>
        </div>
        <div class="footer">
          <p>This is an automated email from JobConnect. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template for when application is accepted (sent to applicant)
export const applicationAcceptedTemplate = (applicantName, jobData, recruiterData) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #11998e; border-radius: 5px; }
        .label { font-weight: bold; color: #11998e; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .success-icon { font-size: 48px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">🎉</div>
          <h1>Congratulations!</h1>
          <p>Your Application Has Been Accepted</p>
        </div>
        <div class="content">
          <p>Dear ${applicantName},</p>
          <p>We are pleased to inform you that your application for the position of <strong>${jobData.title}</strong> at <strong>${recruiterData.company}</strong> has been accepted!</p>
          
          <div class="info-box">
            <h3>💼 Job Details</h3>
            <p><span class="label">Position:</span> ${jobData.title}</p>
            <p><span class="label">Company:</span> ${recruiterData.company}</p>
            <p><span class="label">Location:</span> ${jobData.location}</p>
            <p><span class="label">Work Mode:</span> ${jobData.workMode}</p>
          </div>

          <p><strong>Next Steps:</strong></p>
          <p>The recruiter will contact you shortly at <strong>${applicantName}</strong> to discuss the next steps in the hiring process.</p>
          
          <p>If you have any questions, feel free to reach out to the recruiter at <strong>${recruiterData.email}</strong>.</p>
          
          <p>Best of luck with your interview!</p>
          
          <p>Regards,<br><strong>JobConnect Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated email from JobConnect. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template for when application is rejected (sent to applicant)
export const applicationRejectedTemplate = (applicantName, jobData, recruiterData) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #667eea; border-radius: 5px; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Status Update</h1>
        </div>
        <div class="content">
          <p>Dear ${applicantName},</p>
          <p>Thank you for your interest in the <strong>${jobData.title}</strong> position at <strong>${recruiterData.company}</strong>.</p>
          
          <div class="info-box">
            <h3>📋 Application Status</h3>
            <p>After careful consideration, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs.</p>
          </div>

          <p>We appreciate the time and effort you invested in your application. Your skills and experience are impressive, and we encourage you to apply for other positions at our company that may be a better fit.</p>
          
          <p>We wish you the very best in your job search and future career endeavors.</p>
          
          <p>Best regards,<br><strong>${recruiterData.company} - Recruitment Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated email from JobConnect. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
