const express = require("express");
const authRoutes = require("./auth.route");
const petdetailsRoutes = require("./petdetails.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/petdetails", petdetailsRoutes);

module.exports = router