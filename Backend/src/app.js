require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const userModel = require('./models/user.model');

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
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    if (!email) {
      return done(new Error("No email found from Google profile"), null);
    }

    let user = await userModel.findOne({ email });
    
    if (!user) {
        // Find if username already exists to prevent E11000 duplicate key error
        let baseUsername = profile.displayName || email.split('@')[0];
        let username = baseUsername;
        let userWithSameName = await userModel.findOne({ username });
        let counter = 1;
        while (userWithSameName) {
            username = `${baseUsername}_${Math.floor(Math.random() * 10000)}`;
            userWithSameName = await userModel.findOne({ username });
            counter++;
            if(counter > 10) break; // sanity safeguard
        }

        user = await userModel.create({
            username,
            email,
            googleId: profile.id
        });
    } else if (!user.googleId) {
        user.googleId = profile.id;
        await user.save();
    }
    
    return done(null, user);
  } catch (err) {
    console.error("Google Auth Strategy Error:", err);
    return done(err, null);
  }
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
        id: req.user._id ? req.user._id.toString() : req.user.id,
        username: req.user.username
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