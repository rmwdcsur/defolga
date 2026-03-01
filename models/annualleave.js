const mongoose = require("mongoose");

const annualleaveSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  daysOff: {
    type: Number,
    required: true,
  },
  daysUsed: {
    type: Number,
    required: true,
  },
  compensatoryHours: {
    type: Number,
    required: true,
  },
  compensatoryHoursUsed: {
    type: Number,
    required: true,
  },
});

// Compound index on both _id and year to ensure uniqueness
annualleaveSchema.index({ _id: 1, year: 1 }, { unique: true });

const AnnualLeave = mongoose.model("AnnualLeave", annualleaveSchema);

module.exports = AnnualLeave;
