const mongoose = require('mongoose');

// Fail fast instead of silently buffering queries when there is no active
// connection - this surfaces the real connection error instead of a generic
// "buffering timed out" message.
mongoose.set('bufferCommands', false);

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
    throw new Error('MONGODB_URI not set in environment variables.');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 8000,
        family: 4,
      })
      .then((conn) => {
        console.log('MongoDB connected successfully.');
        return conn;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
