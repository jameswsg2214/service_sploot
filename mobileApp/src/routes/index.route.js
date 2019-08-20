const express = require("express");
const userRoutes = require("./user.route")
const authRoutes = require("./auth.route");
const config = require("../config/config");
const petdetailsRoutes = require("./petdetails.route");
const secret = require('../config/config');
const authService = require("../services/auth.service");


const router = express.Router();


router.use("/auth", authRoutes);
router.use('/user', userRoutes);
router.use("/petdetails", petdetailsRoutes);


module.exports = router