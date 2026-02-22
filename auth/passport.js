const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Logic to handle user after successful login
      try {
        const user = { googleId: profile.id, name: profile.displayName };
        // Display the user info returned by Google OAuth
        console.log("Google OAuth ID: ", profile.id);
        console.log("Google OAuth Name: ", profile.displayName);
        done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
