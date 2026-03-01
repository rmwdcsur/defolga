const express = require("express");
const router = express.Router();
const leavesController = require("../controllers/annualleave");
const authMiddleware = require("../auth/jwtAuth");

// Routes for leaves
router.get("/:id", authMiddleware, leavesController.getAnnualLeaveByEmployeeId);

// Add days used to annual leave
router.post("/:id/add-days-used", authMiddleware, leavesController.addDaysUsed);

// Add compensatory hours used to annual leave
router.post(
  "/:id/add-compensatory-hours-used",
  authMiddleware,
  leavesController.addCompensatoryHoursUsed,
);

// Create a new annual leave record
router.post(
  "/:id/generate",
  authMiddleware,
  leavesController.createAnnualLeave,
);

// Update annual leave record
router.put("/:id", authMiddleware, leavesController.updateAnnualLeave);

module.exports = router;
