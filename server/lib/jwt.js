const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // Good practice to load dotenv here if this file might be run independently,
                                 // though primarily loaded in server.js

dotenv.config(); // Ensure this is present if JWT_SECRET is accessed here directly

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn:"30d",
  });
};

module.exports = generateToken;
