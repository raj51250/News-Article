const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const router = express.Router();

// Load environment variables from .env file
require("dotenv").config();
const SECRET_KEY = process.env.SECRET;

router.post("/register", async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({ ...req.body, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
