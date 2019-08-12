const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../config/param-validation");
const userCtrl = require("../controllers/user.controller");

// const multer = require("multer");
const router = express.Router(); // eslint-disable-line new-cap

router.route("/createUser").post(userCtrl.createUser);
router.route("/verifyOtp").post(userCtrl.verifyOtp);


module.exports = router;
