const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap



const cmdCtrl = require("../controllers/cmsdetails.controller");


router.route("/getCMSlist").post(cmdCtrl.getCMSlist);
router.route("/addCMSdetails").post(cmdCtrl.addCMSdetails);
router.route("/getCMSbyId").post(cmdCtrl.getCMSbyId);
router.route("/updateCMSdetails").put(cmdCtrl.updateCMSdetails );
router.route("/deleteCMSdetails").put(cmdCtrl.deleteCMSdetails);
router.route("/addAdmindetails").post(cmdCtrl.addAdmindetails);
router.route("/getAdminlist").post(cmdCtrl.getAdminlist);


module.exports = router;
