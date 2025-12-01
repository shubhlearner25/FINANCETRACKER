const mongoose = require('mongoose');

// Utility function to initialize MongoDB connection
const connectDB = async () => {
  try {
    // Attempt to establish a connection using the provided URI
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB successfully connected at: ${connection.connection.host}`);
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);

    // Only exit the process in non-test environments
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
