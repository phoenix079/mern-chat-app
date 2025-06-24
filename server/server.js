const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const { connectDB } = require("./lib/db");
const { error } = require("console");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
    cors({
      origin: "*", //tells the server to allow requests from any origin (domain).
    })
  );

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("API is running successfully");
// });

app.use("/api/user", userRoutes);

//Error Handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};
app.use(errorHandler);

// Start the server and connect to DB
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
});

module.exports = app;
