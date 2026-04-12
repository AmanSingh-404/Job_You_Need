require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

// routes
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

const app = express();

// middlewares
const allowedOrigins = [
  'http://localhost:5173',
  'https://job-you-need.vercel.app'
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// ================= GOOGLE AUTH =================

// Configure Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  // Normally: find/create user in DB
  return done(null, profile);
}));

// Google login route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        displayName: req.user.displayName
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/login?token=${token}`);
  }
);

// ================= YOUR ROUTES =================
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// export app
module.exports = app;