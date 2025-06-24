const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/jwt");
const User = require("../models/userSchema.js");


//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public

// const allUsers = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};

//   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
//   res.send(users);
// });

//@description     Register new user
//@route           POST /api/user/
//@access          Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;

    //check for mandatory fields
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        token,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    //Error Handling:
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check for mandatory fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT (token or cookie)
    const token = generateToken(user._id); // or generateToken(user._id, res) if using cookies

    // Send response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token, // remove this if using cookie-based JWT
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};



module.exports = {registerUser, loginUser};
