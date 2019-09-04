const express = require("express");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router(); // eslint-disable-line new-cap
/**
 * POST /api/auth/login - Returns token if correct username and password is provided
 */
router.route("/login").post(authCtrl.login);
router.route("/createAndLoginUser").post(authCtrl.createAndLoginUser);
router.route("/createUser").post(authCtrl.createUser);
router.route("/passwordChange").post(authCtrl.passwordChange);
router.route("/sendOtp").post(authCtrl.sendOtp);
router.route("/verifyOtp").post(authCtrl.verifyOtp);
router.route("/adminlogin").post(authCtrl.adminlogin);
router.route("/forgetPasswordSendOtp").post(authCtrl.forgetPasswordSendOtp);


/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header.
 * Authorization: Bearer {token}
 */
module.exports = router;
