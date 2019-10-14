const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap



const lookupCtrl = require("../controllers/lookup.controller");


router.route("/getCountry").post(lookupCtrl.getCountry);
router.route("/getStateByCountryId").post(lookupCtrl.getStateByCountryId);
router.route("/getCityByStateId").post(lookupCtrl.getCityByStateId);
 
module.exports = router;
