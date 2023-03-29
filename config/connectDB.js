const { default: mongoose } = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const connectDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Error", error);
  }
};

module.exports = connectDB;
