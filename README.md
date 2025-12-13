
# JobConnect 🚀

> A modern, full-stack job recruitment platform connecting talented professionals with their perfect opportunities.

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<div align="center">
  <p><strong>Built with the MERN stack • Modern UI/UX • Real-time Notifications</strong></p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**JobConnect** is a comprehensive recruitment platform designed to streamline the hiring process. It bridges the gap between job seekers and recruiters with an intuitive interface, real-time notifications, and powerful matching capabilities.

### Key Highlights

- 🎨 **Beautiful UI**: Modern purple & teal color scheme with dark mode support
- 🔔 **Real-time Notifications**: In-app bell notifications + email alerts
- 👥 **Dual User Roles**: Separate dashboards for applicants and recruiters
- 📧 **Email Integration**: Automated email notifications via Nodemailer
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🔐 **Secure Authentication**: JWT-based auth with HTTP-only cookies
- 📱 **Responsive Design**: Works seamlessly on all devices

---

## ✨ Features

### For Job Seekers (Applicants)

#### Job Discovery & Application
- 🔍 **Smart Job Search**: Browse curated job listings with advanced filters
- 📝 **Quick Apply**: One-click application process
- 💾 **Save Jobs**: Bookmark interesting positions for later
- 📊 **Application Tracking**: Monitor application status (Pending/Accepted/Rejected)

#### Profile Management
- 👤 **Profile Customization**: Upload profile pictures, manage skills, experience, resume
- 📈 **Application Stats**: Track total applications, success rate, and pending reviews
- 🔔 **Notification Center**: Real-time bell notifications for application status updates
- 📧 **Email Alerts**: Receive acceptance/rejection emails automatically

### For Recruiters

#### Job Management
- ➕ **Post Jobs**: Create detailed job listings with skills, experience, salary, location
- ✏️ **Edit/Delete**: Full control over job postings
- 👀 **View Applicants**: Browse all candidates who applied for each position
- ✅ **Applicant Actions**: Accept or reject applicants with one click

#### Recruitment Dashboard
- 📊 **Insights & Analytics**: Track total jobs, applicants, acceptance/rejection rates
- 🔔 **Application Notifications**: Get notified when candidates apply
- 📧 **Email Notifications**: Automatic emails when new applicants arrive
- 🏢 **Company Profile**: Manage company information and recruiter details

### System-Wide Features

#### Notification System
- 🔔 **In-App Bell Icon**: Dropdown panel showing recent notifications
- 🔴 **Unread Badge**: Visual indicator for new notifications
- 📨 **Application Received**: Recruiters get notified when applicants apply
- ✅ **Status Updates**: Applicants get notified of acceptance/rejection
- ♻️ **Auto-Refresh**: Notifications refresh every 30 seconds
- 👁️ **Mark as Read**: Single or bulk mark-as-read functionality

#### Email Notifications
- 📧 **Recruiter Emails**: Detailed applicant info when someone applies
- 📧 **Applicant Emails**: Professional acceptance/rejection templates
- 🎨 **HTML Templates**: Branded, beautiful email designs
- ⚡ **Non-blocking**: Email sending doesn't slow down the app

#### Dark Mode
- 🌙 **Theme Toggle**: Moon/Sun icon in header to switch themes
- 💾 **Persistence**: Theme saved in localStorage across sessions
- 🎨 **Custom Colors**: Beautiful purple/teal palette in both modes
- 🔄 **Smooth Transitions**: Seamless color transitions

#### Modern UI/UX
- 🎨 **Custom Color Palette**:
  - Deep Purple (#332D56) - Headers, primary elements
  - Slate Blue (#4E6687) - Secondary actions
  - Teal (#71C0BB) - Interactive elements, links
  - Mint (#E3EEB2) - Light backgrounds, accents
- 📱 **Fully Responsive**: Mobile, tablet, and desktop optimized
- ⚡ **Smooth Animations**: Hover effects, transitions, loading states
- 🎯 **Intuitive Navigation**: Clear user flows for all actions

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management with persistence
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **Framer Motion** - Smooth animations (notifications)
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Nodemailer** - Email service
- **Cookie-Parser** - HTTP-only cookies
- **CORS** - Cross-origin requests

### DevOps & Tools
- **Vite** - Build tool
- **Cloudinary** - Image hosting (profile pictures)
- **Gmail SMTP** - Email delivery
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/JobConnect.git
   cd JobConnect
   ```

2. **Install dependencies**

   Backend:
   ```bash
   cd server
   npm install
   ```

   Frontend:
   ```bash
   cd ../client
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Start the development servers**

   Backend (from `server` directory):
   ```bash
   npm run dev
   ```

   Frontend (from `client` directory):
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8081`

---

## 🔐 Environment Variables

### Backend (.env in `/server`)

```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=8081

# Email Configuration (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env in `/client`)

```env
# Backend API URL
VITE_API_URL=http://localhost:8081
```

### Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification
3. Go to Security → 2-Step Verification → App Passwords
4. Generate an app password for "Mail"
5. Use this password in `EMAIL_PASS`

---

## 📁 Project Structure

```
JobConnect/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── header.jsx
│   │   │   ├── footer.jsx
│   │   │   ├── notification-bell.jsx
│   │   │   ├── theme-toggle.jsx
│   │   │   └── JobForm.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── ApplicantDashboard.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   └── ...
│   │   ├── redux/            # Redux store & slices
│   │   │   ├── store.js
│   │   │   ├── userSlice.js
│   │   │   ├── themeSlice.js
│   │   │   └── ...
│   │   ├── apiCalls/         # API service functions
│   │   ├── App.jsx           # Main app component
│   │   └── index.css         # Global styles
│   └── package.json
│
└── server/                    # Backend Node.js application
    ├── config/               # Configuration files
    │   └── db.js
    ├── controllers/          # Request handlers
    │   ├── auth.controller.js
    │   ├── applicant.controller.js
    │   ├── recruiter.controller.js
    │   └── notification.controller.js
    ├── models/               # Mongoose schemas
    │   ├── applicant.model.js
    │   ├── recruiter.model.js
    │   ├── job.model.js
    │   ├── application.model.js
    │   └── notification.model.js
    ├── routes/               # API routes
    ├── services/             # Business logic
    │   └── email.service.js
    ├── utils/                # Utility functions
    │   └── emailTemplates.js
    ├── middlewares/          # Custom middleware
    │   └── authMiddleware.js
    ├── index.js              # Server entry point
    └── package.json
```

---

## 📡 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |

### Applicant Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applicant/jobs` | Get all jobs |
| POST | `/api/applicant/apply/:jobId` | Apply for a job |
| GET | `/api/applicant/applications` | Get user's applications |
| GET | `/api/applicant/saved-jobs` | Get saved jobs |
| POST | `/api/applicant/save-job/:jobId` | Save a job |

### Recruiter Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recruiter/post-job` | Create new job posting |
| PUT | `/api/recruiter/update-job/:jobId` | Update job posting |
| DELETE | `/api/recruiter/delete-job/:jobId` | Delete job posting |
| GET | `/api/recruiter/jobs` | Get recruiter's jobs |
| GET | `/api/recruiter/applications` | Get all applications |
| PUT | `/api/recruiter/update-status/:applicationId` | Accept/reject applicant |

### Notification Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Get user notifications |
| PUT | `/api/notifications/:id/read` | Mark notification as read |
| PUT | `/api/notifications/read-all` | Mark all as read |

---

## 🎨 Color Palette

The application uses a sophisticated purple & teal color scheme:

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Purple | `#332D56` | Headers, footers, primary backgrounds |
| Slate Blue | `#4E6687` | Secondary elements, recruiter accents |
| Teal | `#71C0BB` | Buttons, links, interactive elements |
| Mint | `#E3EEB2` | Light backgrounds, highlights |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kavya**
- GitHub: [@Kavya100206](https://github.com/Kavya100206)

---

## 🙏 Acknowledgments

- Color palette inspiration from [Color Hunt](https://colorhunt.co/)
- Icons from [Lucide React](https://lucide.dev/)
- UI inspiration from modern job platforms

---

<div align="center">
  <p>Made with ❤️ by Kavya</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
