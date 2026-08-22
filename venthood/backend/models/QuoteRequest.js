const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    city: { type: String, default: 'Calgary' },
    propertyType: { type: String, enum: ['Residential', 'Commercial'], default: 'Residential' },
    service: { type: String, required: true },
    hoodType: { type: String, default: '' },
    kitchenLayout: { type: String, default: '' },
    ductLength: { type: String, default: '' },
    preferredDate: { type: String, default: '' },
    budgetRange: { type: String, default: '' },
    details: { type: String, default: '' },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quoted', 'Won', 'Lost'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
