const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../config/param-validation");
const boardCtrl = require("../controllers/board.controller");
const router = express.Router();

router.route("/getCategoryy").post(boardCtrl.getCategoryy);
module.exports = router;
