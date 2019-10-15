const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap



const lookupCtrl = require("../controllers/lookup.controller");


router.route("/getCountrylist").post(lookupCtrl.getCountrylist);
router.route("/getStatelistByCountryId").post(lookupCtrl.getStatelistByCountryId);
router.route("/getCitylistByStateId").post(lookupCtrl.getCitylistByStateId);
 
module.exports = router;
