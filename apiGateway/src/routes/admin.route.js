const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller");



/** Users Routes */
router.route("/deleteUser").put(adminCtrl.deleteUser);
router.route("/createUser").post(adminCtrl.createUser);
router.route("/verifyOtp").post(adminCtrl.verifyOtp);

/* Departments */
router.route("/getuserById").post(adminCtrl.getuserById);

module.exports = router;
