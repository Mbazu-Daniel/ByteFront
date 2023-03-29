const asyncHandler = require("express-async-handler");
const User = require("../models/users.models");

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

module.exports = {
  createUser,
};
