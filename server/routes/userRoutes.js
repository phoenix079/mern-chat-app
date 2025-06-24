const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController.js");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/").get(protect, allUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/login", authUser);

module.exports = router;
