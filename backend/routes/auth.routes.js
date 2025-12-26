const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

// test protected
router.get("/me", verifyToken, (req, res) => {
  res.json(req.user);
});

// admin test
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
