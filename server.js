const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const MONGO_URI = process.env.MONGO_URI;
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/users.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use("/auth", authRouter);

// Health check
app.use("/health", (req, res) => {
  res.send("Welcome to the Blog");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
