const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap



const lookupCtrl = require("../controllers/lookup.controller");


router.route("/getCountrylist").post(lookupCtrl.getCountry);
router.route("/getStatelistByCountryId").post(lookupCtrl.getStateByCountryId);
router.route("/getCitylistByStateId").post(lookupCtrl.getCityByStateId);
 
module.exports = router;
