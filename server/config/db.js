const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error("Is MongoDB running? Open MongoDB Compass and connect to", process.env.MONGO_URI);
    process.exit(1); // the server must not start without the database
  }
};
