const mongoose = require('mongoose');

// Cache the connection across invocations - required on serverless platforms
// (e.g. Vercel) where the module can be reused between requests instead of
// reconnecting to MongoDB every time, which would quickly exhaust connections.
let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set in environment variables.');
    return null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri)
      .then((conn) => {
        console.log('MongoDB connected successfully.');
        return conn;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        cached.promise = null;
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
