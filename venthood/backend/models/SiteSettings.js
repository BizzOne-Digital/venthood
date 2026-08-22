const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    businessName: { type: String, default: 'Venthood.ca' },
    phones: [{ type: String }],
    email: { type: String, default: 'info@venthood.ca' },
    whatsapp: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    heroHeading: { type: String, default: '' },
    heroDescription: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    serviceAreas: [{ type: String }],
    footerText: { type: String, default: '' },
  },
  { timestamps: true }
);

// Singleton helper - always fetch/create the single settings document
siteSettingsSchema.statics.getSingleton = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
