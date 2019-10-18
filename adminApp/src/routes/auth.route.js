const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../config/param-validation");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router(); // eslint-disable-line new-cap

router.route("/adminlogin").post(validate(paramValidation.login), authCtrl.adminlogin);
router.route("/createadmin").post(validate(paramValidation.login), authCtrl.adminlogin);

module.exports = router;
