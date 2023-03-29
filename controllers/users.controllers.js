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
  const { email, password, username } = req.body;
  // check if user already exists
  // check if user already exists
  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

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

// get all users
const allUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.json({
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get single user
const singleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json({
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(204).json({ msg: `User with id ${id} deleted successfully` });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  allUsers,
  singleUser,
  deleteUser,
};
