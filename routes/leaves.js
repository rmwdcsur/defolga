const express = require("express");
const router = express.Router();

// Routes for leaves
router.get("/", (req, res) => {
  res.json({ message: "Leaves route" });
});

module.exports = router;
