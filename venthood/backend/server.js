require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security & core middleware
app.use(helmet());

// Ensure the MongoDB connection is established (or has clearly failed) before
// any route handler runs a query - avoids the generic "buffering timed out"
// error masking the real connection failure.
app.use((req, res, next) => {
  if (req.path === '/api/health') return next();
  connectDB()
    .then(() => next())
    .catch((err) => {
      console.error('DB connection failed for request:', err.message);
      res.status(500).json({ success: false, message: `Database connection failed: ${err.message}` });
    });
});

const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiter for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/quotes', require('./routes/quoteRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/availability', require('./routes/availabilityRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'venthood-backend' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Central error handler
app.use(errorHandler);

// On Vercel the app is exported as a serverless function handler instead of
// binding to a port - Vercel's Node runtime calls the exported app directly.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Venthood backend server running on port ${PORT}`);
  });
}

module.exports = app;
