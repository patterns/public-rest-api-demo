import mongoose from 'mongoose';

// Connect to the MongoDB database
let mongoDBURI;

if (process.env.NODE_ENV === 'test') {
  mongoDBURI = process.env.TEST_MONGODB_URI ?? 'mongodb://localhost:27017';
} else {
  const { ATLAS_URI } = process.env;
  if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
  }
  mongoDBURI = ATLAS_URI;
}

mongoose.connect(mongoDBURI);
export default mongoose;
