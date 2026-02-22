const AnnualLeave = require("../models/annualleave.js");
const ObjectId = require("mongodb").ObjectId;

// Get annual leave by Employee Object ID
exports.getAnnualLeaveByEmployeeId = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }
  try {
    const { id } = req.params;
    const mongoose = require("mongoose");

    let annualLeave = null;

    // Try treating id as a Mongo ObjectId first
    if (mongoose.Types.ObjectId.isValid(id)) {
      annualLeave = await AnnualLeave.findOne({ _id: id });
    }
    if (!annualLeave) {
      return res.status(404).json({ message: "Annual leave record not found" });
    }
    res.json(annualLeave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add days used to annual leave
exports.addDaysUsed = async (req, res) => {
  try {
    const { id } = req.params;
    const { daysUsed } = req.body;
    const annualLeave = await AnnualLeave.findOne({ _id: id });
    if (!annualLeave) {
      return res.status(404).json({ message: "Annual leave record not found" });
    }
    if (annualLeave.daysUsed + daysUsed > annualLeave.daysOff) {
      return res.status(400).json({ message: "Not enough days off remaining" });
    }
    annualLeave.daysUsed += daysUsed;
    await annualLeave.save();
    res.json(annualLeave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add compensatory hours used to annual leave
exports.addCompansatoryHoursUsed = async (req, res) => {
  try {
    const { id } = req.params;
    const { compansatoryHoursUsed } = req.body;
    const annualLeave = await AnnualLeave.findOne({ _id: id });
    if (!annualLeave) {
      return res.status(404).json({ message: "Annual leave record not found" });
    }
    if (
      annualLeave.compansatoryHoursUsed + compansatoryHoursUsed >
      annualLeave.compansatoryHours
    ) {
      return res
        .status(400)
        .json({ message: "Not enough compensatory hours remaining" });
    }
    annualLeave.compansatoryHoursUsed += compansatoryHoursUsed;
    await annualLeave.save();
    res.json(annualLeave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new annual leave record
exports.createAnnualLeave = async (req, res) => {
  try {
    const {
      _id,
      year,
      daysOff,
      daysUsed,
      compansatoryHours,
      compansatoryHoursUsed,
    } = req.body;
    const newAnnualLeave = new AnnualLeave({
      _id,
      year,
      daysOff,
      daysUsed,
      compansatoryHours,
      compansatoryHoursUsed,
    });
    const savedAnnualLeave = await newAnnualLeave.save();
    res.status(201).json(savedAnnualLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing annual leave record
exports.updateAnnualLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      year,
      daysOff,
      daysUsed,
      compansatoryHours,
      compansatoryHoursUsed,
    } = req.body;
    const annualLeave = await AnnualLeave.findOne({ _id: id });
    if (!annualLeave) {
      return res.status(404).json({ message: "Annual leave record not found" });
    }
    annualLeave.year = year !== undefined ? year : annualLeave.year;
    annualLeave.daysOff = daysOff !== undefined ? daysOff : annualLeave.daysOff;
    annualLeave.daysUsed =
      daysUsed !== undefined ? daysUsed : annualLeave.daysUsed;
    annualLeave.compansatoryHours =
      compansatoryHours !== undefined
        ? compansatoryHours
        : annualLeave.compansatoryHours;
    annualLeave.compansatoryHoursUsed =
      compansatoryHoursUsed !== undefined
        ? compansatoryHoursUsed
        : annualLeave.compansatoryHoursUsed;
    await annualLeave.save();
    res.json(annualLeave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
