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
router.route("/createadmin").post(authCtrl.createadmin);
router.route("/forgetPasswordSendOtp").post(authCtrl.forgetPasswordSendOtp);
router.route("/login").post(authCtrl.login);
router.route("/createuserprofile").post(authCtrl.createuserprofile);
router.route("/getuserprofile").get(authCtrl.getuserprofile);
router.route("/remainderMail").post(authCtrl.remainderMail);
router.route("/getprofilebyId").post(authCtrl.getprofilebyId);


/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header.
 * Authorization: Bearer {token}
 */
module.exports = router;
