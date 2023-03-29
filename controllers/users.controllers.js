const asyncHandler = require("express-async-handler");
const User = require("../models/users.models");
const { generateToken } = require("../config/jwtToken");

const createUser = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  const findUserEmail = await User.findOne({ email: email });

  const findUsername = await User.findOne({ username: username });

  if (!findUserEmail && !findUsername) {
    // create a new user
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } else {
    // user already exists
    res.status(400).json({ msg: "User already exists" });
    throw new Error("User already exists");
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user already exists
  const user = await User.findOne({ email: email });

  if (user && (await user.comparePassword(password))) {
    res.status(201).json({
      _id: user?.id,
      username: user?.username,
      email: user?.email,

      token: generateToken(user?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  createUser,
  loginUser,
};
