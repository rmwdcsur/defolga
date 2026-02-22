const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../auth/passport");
const router = express.Router();

// Redirect to Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate a JWT for the authenticated user
    const token = jwt.sign(
      { userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }, // Token expiration
    );

    res.redirect(`http://localhost:3000/api-docs?token=${token}`);
  },
);

module.exports = router;
