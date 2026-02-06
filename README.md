# FitScore AI 🎯

> **Measure your job fit before you apply.**

FitScore AI is an intelligent resume analyzer that helps job seekers understand how well their resume matches a specific job description. Built with the MERN stack and powered by AI, it provides instant fit scores with confidence insights.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [How It Works](#-how-it-works)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- 📄 **Resume Upload** - Upload PDF resumes with automatic text extraction
- 🎯 **AI-Powered Matching** - Get instant fit scores (30-95%) based on job description alignment
- 📊 **Confidence Levels** - Receive confidence ratings (Low, Medium, High, Excellent)
- 🔍 **Skill Matching** - See which skills from the job description match your resume
- 📝 **Manual Text Input** - Paste resume text directly for highest accuracy
- 💾 **Resume Management** - Dashboard to view and manage uploaded resumes

### Technical Features
- 🔐 **User Authentication** - Secure JWT-based authentication system
- 📦 **PDF Processing** - Native PDF text extraction with OCR fallback (Tesseract.js)
- 🚀 **Rate Limiting** - API rate limiting for security (30 requests/minute)
- 🎨 **Modern UI** - Clean, responsive interface built with React
- 🔄 **Real-time Analysis** - Instant scoring with detailed feedback

---

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.10.1** - Client-side routing
- **Axios 1.13.2** - HTTP client
- **React Hook Form 7.68.0** - Form management

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - Database
- **Mongoose 9.0.1** - ODM for MongoDB

### AI & Processing
- **OpenAI API** - AI-powered analysis
- **pdf-parse 2.4.5** - PDF text extraction
- **Tesseract.js 7.0.0** - OCR fallback for scanned PDFs
- **pdf-poppler 0.2.3** - Advanced PDF processing

### Security & Middleware
- **bcrypt 6.0.0** - Password hashing
- **jsonwebtoken 9.0.3** - JWT authentication
- **express-rate-limit 8.2.1** - Rate limiting
- **cors 2.8.5** - CORS middleware
- **multer 2.0.2** - File upload handling

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **OpenAI API Key** (for AI analysis)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/FitScore-AI.git
cd FitScore-AI
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/resume_ranker_db
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resume_ranker_db

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# CORS (frontend URL)
CORS_ORIGIN=http://localhost:5173
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:5000` by default. If you change the backend port, update the `API_BASE` constant in:
- `frontend/src/pages/Analyze.jsx`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/UploadResume.jsx`
- `frontend/src/services/api.js`

---

## 🎮 Usage

### Starting the Application

#### 1. Start MongoDB (if running locally)

```bash
mongod
```

#### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Using the Application

1. **Register/Login** - Create an account or log in
2. **Upload Resume** - Navigate to `/upload` and upload your PDF resume
3. **Analyze** - Go to `/analyze`:
   - Paste your resume text (recommended for best accuracy)
   - Paste the job description
   - Click "Analyze" to get your fit score
4. **View Dashboard** - Check all your uploaded resumes at `/dashboard`

---

## 📁 Project Structure

```
FitScore-AI/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database configuration
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentication logic
│   │   │   └── resumeController.js   # Resume operations
│   │   ├── middleware/
│   │   │   └── auth.js               # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   └── Resume.js             # Resume schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # Auth endpoints
│   │   │   └── resumeRoutes.js       # Resume endpoints
│   │   ├── uploads/                  # Uploaded PDF storage
│   │   └── server.js                 # Main server file
│   ├── eng.traineddata               # Tesseract OCR English data
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/                   # Images, icons
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation component
│   │   │   ├── ResumeViewer.jsx      # Resume display component
│   │   │   └── Tag.jsx               # Tag component
│   │   ├── pages/
│   │   │   ├── Landing.jsx           # Landing page
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   ├── UploadResume.jsx      # Resume upload page
│   │   │   ├── Dashboard.jsx         # Resume dashboard
│   │   │   └── Analyze.jsx           # Analysis page
│   │   ├── services/
│   │   │   ├── api.js                # API service
│   │   │   └── authApi.js            # Auth API service
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   ├── mock/
│   │   └── db.json                   # Mock data for testing
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### Resume Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/upload` | Upload PDF resume | No* |
| GET | `/api/resumes` | Get all resumes | No* |
| DELETE | `/api/resumes/:id` | Delete resume | No* |
| POST | `/api/analyze` | Analyze resume vs job description | No |

*Authentication middleware exists but may not be enforced on all routes in current version.

### Request/Response Examples

#### Upload Resume
```javascript
POST /api/upload
Content-Type: multipart/form-data

// Form data
resume: [PDF file]

// Response
{
  "success": true,
  "id": "65f8a9b1c2d3e4f5g6h7i8j9",
  "textLength": 3456
}
```

#### Analyze Resume
```javascript
POST /api/analyze
Content-Type: application/json

{
  "resumeId": "65f8a9b1c2d3e4f5g6h7i8j9",  // Optional
  "resumeText": "Full resume text...",      // Recommended
  "jdText": "Job description text..."
}

// Response
{
  "score": 78,
  "confidence": "High",
  "method": "Skill-weighted matching",
  "matchedSkills": ["javascript", "react", "mongodb", "nodejs"],
  "totalJDKeywords": 45
}
```

---

## 🧠 How It Works

### Analysis Algorithm

FitScore AI uses a multi-step analysis process:

1. **Text Extraction**
   - Primary: Uses `pdf-parse` for native PDF text extraction
   - Fallback: Tesseract.js OCR for scanned or image-based PDFs

2. **Text Preprocessing**
   - Converts text to lowercase
   - Removes special characters
   - Filters out common stopwords (and, the, or, etc.)
   - Tokenizes into individual words

3. **Skill Matching**
   - Extracts unique keywords from job description
   - Identifies matching skills in resume
   - Calculates match ratio: `matchedSkills / totalJDKeywords`

4. **Score Calculation**
   ```
   score = 30 + (matchRatio × 70)
   ```
   - Normalized between 30-95
   - Weighted towards skill relevance

5. **Confidence Rating**
   - **Low** (30-45): Limited match
   - **Medium** (46-65): Moderate alignment
   - **High** (66-85): Strong match
   - **Excellent** (86-95): Exceptional fit

### Why Paste Resume Text?

Design-heavy PDFs (with graphics, columns, or unusual formatting) may not extract accurately. For best results:
- ✅ Copy text from Word/Google Docs
- ✅ Use LinkedIn's PDF export
- ✅ Paste plain text directly into the analyzer

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Tesseract.js for OCR
- The MERN stack community
- All contributors to open-source libraries used in this project

---

## 📧 Contact

For questions, suggestions, or issues, please open an issue on GitHub.

---

**Built with ❤️ as a MERN + AI project**
