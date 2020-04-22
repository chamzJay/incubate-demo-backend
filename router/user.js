const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const bcrypt = require("bcryptjs");

//register
router.post("/api/user", async (req, res) => {
  let body = {
    username: req.body.username,
    role: req.body.role,
  };
  let password = req.body.password;
  let hashedPassword = bcrypt.hashSync(password, 8);
  let user = User({ ...body, password: hashedPassword });

  try {
    await user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

//login
router.post("/api/user/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    const user = await User.findByCredentials(username, password);
    res.send({ user_id: user._id, username: user.username, role: user.role });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});
module.exports = router;
