const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true }, // YYYY-MM-DD
    slots: [{ type: String }], // e.g. ['09:00', '11:00', '14:00']
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Availability', availabilitySchema);
