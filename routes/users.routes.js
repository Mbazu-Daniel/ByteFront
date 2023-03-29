const express = require("express");
const {
  createUser,
  loginUser,
  allUsers,
  singleUser,
} = require("../controllers/users.controllers");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/user", allUsers);
router.get("/user/:id", singleUser);

module.exports = router;
