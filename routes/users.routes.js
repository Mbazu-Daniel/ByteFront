const express = require("express");
const {
  createUser,
  loginUser,
  allUsers,
  singleUser,
  deleteUser,
  updateUser,
} = require("../controllers/users.controllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/user", allUsers);
router.get("/user/:id", authMiddleware, singleUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

module.exports = router;
