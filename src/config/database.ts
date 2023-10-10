import mongoose from 'mongoose';

const db = require('../resources/settings').MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, { autoIndex: true });
    console.log('=== MONGODB CONNECTED ===');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connectDB };
