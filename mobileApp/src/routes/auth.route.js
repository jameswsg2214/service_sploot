const express = require("express");
const validate = require("express-validation");
// const expressJwt = require("express-jwt");
const paramValidation = require("../config/param-validation");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router(); // eslint-disable-line new-cap

/**
 * POST /api/auth/login - Returns token if correct username and password is provided
 */

router.route("/login").post(authCtrl.login);
router.route("/createUser").post(authCtrl.createUser);
router.route("/passwordChange").post(authCtrl.passwordChange);
router.route("/sendOtp").post(authCtrl.sendOtp);
router.route("/verifyOtp").post(authCtrl.verifyOtp);
router.route("/forgetPassword").post(authCtrl.forgetPassword);
router.route("/createAndLoginUser").post(authCtrl.createAndLoginUser);
router.route("/forgetPasswordSendOtp").post(authCtrl.forgetPasswordSendOtp);
router.route("/createuserprofile").post(authCtrl.createuserprofile);
router.route("/getuserprofile").get(authCtrl.getuserprofile);
router.route("/remainderMail").post(authCtrl.remainderMail);

router.route("/getprofilebyId").post(authCtrl.getprofilebyId);


/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header.
 * Authorization: Bearer {token}
 */
// router.route("/random-number").get(
//     expressJwt({
//         secret: config.jwtSecret
//     }),
//     authCtrl.getRandomNumber
// );

module.exports = router;
