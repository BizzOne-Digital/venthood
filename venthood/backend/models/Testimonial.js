const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, default: 'Calgary, AB' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    review: { type: String, required: true },
    service: { type: String, default: '' },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
