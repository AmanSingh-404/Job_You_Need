# 🚀 Job You Need

> **AI-Powered Interview Preparation Platform** — Upload your resume, paste a job description, and get a personalized interview report powered by Google Gemini AI.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_2.5_Flash-4285F4?logo=google)](https://ai.google.dev/)

---

## ✨ Features

- 📄 **Resume Analysis** — Upload your resume (PDF) and let AI parse and evaluate it against the job description
- 🤖 **AI Interview Report** — Generates a comprehensive report including:
  - **Match Score** — How closely your profile matches the job
  - **Technical Questions** — Role-specific questions with ideal answers and interviewer intent
  - **Behavioral Questions** — Soft-skill questions with structured response guidance
  - **Skills Gap Analysis** — Identifies missing skills with severity ratings (Low / Medium / High) and improvement advice
  - **Day-wise Preparation Plan** — A personalized roadmap to prepare for the interview
- 📝 **AI Resume Builder** — Generates a tailored, ATS-friendly resume as a downloadable PDF
- 🔐 **Authentication** — Email/password registration & login, plus **Google OAuth 2.0**
- 📊 **Dashboard** — View and manage all your past interview reports
- 🔒 **Protected Routes** — Secure pages accessible only to authenticated users

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite 8 | Build Tool & Dev Server |
| TailwindCSS 4 | Utility-first Styling |
| React Router v7 | Client-side Routing |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API Server |
| MongoDB + Mongoose | Database & ODM |
| Google Gemini 2.5 Flash (`@google/genai`) | AI Report & Resume Generation |
| Passport.js + Google OAuth 2.0 | Social Authentication |
| JSON Web Tokens (JWT) | Stateless Auth / Session |
| Bcrypt | Password Hashing |
| Multer | Resume File Uploads |
| pdf-parse | PDF Text Extraction |
| Puppeteer | HTML-to-PDF Resume Generation |
| Zod | Schema Validation |

---

## 📁 Project Structure

```
Job-You-Need/
├── Backend/
│   ├── server.js               # Entry point
│   └── src/
│       ├── app.js              # Express app, CORS, Passport & Google OAuth config
│       ├── controllers/        # Route handlers (auth, interview)
│       ├── db/                 # MongoDB connection
│       ├── middlewares/        # Auth middleware, file upload middleware
│       ├── models/             # Mongoose schemas (User, Interview)
│       ├── routes/             # API route definitions
│       └── services/           # AI service (Gemini), PDF generation (Puppeteer)
│
└── Frontend/
    ├── index.html
    └── src/
        ├── app.routes.jsx      # Client-side route definitions
        ├── App.jsx             # Root component
        ├── features/
        │   ├── auth/           # Login, Register pages, auth context & hooks
        │   └── interview/      # Landing, Dashboard (Home), Interview report pages
        └── components/         # Shared UI components
```

---

## 🌐 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/register` | Register a new user | Public |
| `POST` | `/login` | Login with email & password | Public |
| `GET` | `/logout` | Clear auth token & logout | Public |
| `GET` | `/me` | Get currently logged-in user | Private |

### OAuth — `/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/google` | Initiate Google OAuth flow |
| `GET` | `/auth/google/callback` | Google OAuth callback, issues JWT & redirects |

### Interview — `/api/interview`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/` | Generate a new interview report (multipart: resume PDF + fields) | Private |
| `GET` | `/` | Get all interview reports for the logged-in user | Private |
| `GET` | `/report/:interviewId` | Get a specific interview report by ID | Private |
| `POST` | `/resume-pdf/:interviewId` | Generate & download a tailored resume PDF | Private |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google Cloud project with OAuth 2.0 credentials
- Google AI Studio API key ([Get one here](https://aistudio.google.com/))

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/job-you-need.git
cd job-you-need
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_jwt_key

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

GOOGLE_GENAI_API_KEY=your_gemini_api_key

BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

Start the backend dev server:

```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

---

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🚀 Deployment

This project is deployed with:
- **Frontend** → [Vercel](https://vercel.com/) (`https://job-you-need.vercel.app`)
- **Backend** → Any Node.js-compatible host (e.g., Render, Railway, or a VPS)

### Important: Google OAuth & CORS

When deploying, ensure the following environment variables are updated on your backend host:

```env
BACKEND_URL=https://your-backend-domain.com
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

Also ensure your **Google Cloud Console** → OAuth 2.0 credentials have the correct:
- **Authorized JavaScript origins**: `https://your-backend-domain.com`
- **Authorized redirect URIs**: `https://your-backend-domain.com/auth/google/callback`

---

## 🔐 Authentication Flow

```
[Email/Password]                  [Google OAuth]
      │                                 │
POST /api/auth/login          GET /auth/google
      │                                 │
  Verify credentials          Google redirects to callback
      │                                 │
  Issue JWT cookie             Issue JWT cookie + redirect to /login?token=...
      │                                 │
  Protected routes accessible   Frontend stores token, session begins
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

<p align="center">Built with ❤️ using React, Node.js, and Google Gemini AI</p>
