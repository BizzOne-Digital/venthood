const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    completionDate: { type: Date },
    category: { type: String, default: 'General' },
    images: [{ type: String }],
    featuredImage: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
