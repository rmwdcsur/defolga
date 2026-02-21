const mongoose = require("mongoose");

const annualleaveSchema = new mongoose.Schema({
  _id: {
    type: Number,
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
  compansatoryHours: {
    type: Number,
    required: true,
  },
  compansatoryHoursUsed: {
    type: Number,
    required: true,
  },
});

const AnnualLeave = mongoose.model("AnnualLeave", annualleaveSchema);

module.exports = AnnualLeave;
