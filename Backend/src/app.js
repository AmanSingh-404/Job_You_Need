require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

// routes
const authRouter = require('./routes/auth.routes');

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// ================= GOOGLE AUTH =================

// Configure Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
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

    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

// ================= YOUR ROUTES =================
app.use('/api/auth', authRouter);

// export app
module.exports = app;