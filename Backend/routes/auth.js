const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User With This email already exist" });
      }
      req.body.password = await bcrypt.hash(req.body.password, 4);
      user = new User(req.body);
      await user.save();
      const authToken = jwt.sign({ id: user._id }, process.env.KEY);
      res.send({ success: true, authToken });
    } catch (error) {
      res.status(500).json({ success: false, error: "catch auth" });
    }
  }
);
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "invalid credential" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ success, error: "invalid credential" });
      }
      const authToken = jwt.sign({ id: user._id }, process.env.KEY);
      success = true;
      res.json({ success, authToken, name: user.name });
    } catch (error) {
      success = false;
      res.status(500).json({ success, error: "catch auth" });
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    res.json({ error: "Catch Error" });
  }
});

module.exports = router;
