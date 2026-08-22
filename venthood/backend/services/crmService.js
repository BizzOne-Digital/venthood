const axios = require('axios');

// Sends a lead payload to an external CRM if enabled via env config.
// No-ops silently when CRM_ENABLED !== 'true'. Never throws.
const sendLeadToCRM = async (lead) => {
  try {
    if (process.env.CRM_ENABLED !== 'true') return;
    if (!process.env.CRM_API_URL) return;

    await axios.post(process.env.CRM_API_URL, lead, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CRM_API_KEY || ''}`,
      },
      timeout: 8000,
    });
  } catch (err) {
    console.error('CRM sync failed:', err.message);
  }
};

module.exports = { sendLeadToCRM };
