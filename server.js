const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const MONGO_URI = process.env.MONGO_URI;
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/connectDB");
const { notFound, errorHandler } = require("./middlewares/errors");
const authRouter = require("./routes/users.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Health check
app.use("/health", (req, res) => {
  res.send("Welcome to the Blog");
});

// Routers
app.use("/auth", authRouter);

// Middleware
app.use(notFound);
app.use(errorHandler);

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
