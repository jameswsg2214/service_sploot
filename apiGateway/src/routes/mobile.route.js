const express = require("express");
const router = express.Router();
const mobileCtrl = require("../controllers/mobile.controller");



/** Users Routes */
router.route("/deleteUser").put(mobileCtrl.deleteUser);
router.route("/createUser").post(mobileCtrl.createUser);
router.route("/verifyOtp").post(mobileCtrl.verifyOtp);

/* Departments */
router.route("/getuserById").post(mobileCtrl.getuserById);

module.exports = router;
