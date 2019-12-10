const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller");
const admincmsCtrl = require("../controllers/admincms.controller");
const adminlookupCtrl = require("../controllers/lookup.controller");




/** Users Routes */
router.route("/deleteUser").put(adminCtrl.deleteUser);
router.route("/createUser").post(adminCtrl.createUser);
router.route("/verifyOtp").post(adminCtrl.verifyOtp);
router.route("/getDashBoardSummary").post(adminCtrl.getDashBoardSummary);
router.route("/getAppointmentsView").post(adminCtrl.getAppointmentsView);



/* Departments */
router.route("/getuserById").post(adminCtrl.getuserById);


/*======================cms details Routes==================== */
router.route("/getCMSlist").post(admincmsCtrl.getCMSlist);
router.route("/addCMSdetails").post(admincmsCtrl.addCMSdetails);
router.route("/getCMSbyId").post(admincmsCtrl.getCMSbyId);
router.route("/updateCMSdetails").put(admincmsCtrl.updateCMSdetails );
router.route("/deleteCMSdetails").put(admincmsCtrl.deleteCMSdetails);
router.route("/addAdmindetails").post(admincmsCtrl.addAdmindetails);
router.route("/getAdminlist").post(admincmsCtrl.getAdminlist);



/*======================LookUp details Routes==================== */
router.route("/getCountrylist").post(adminlookupCtrl.getCountrylist);
router.route("/getStatelistByCountryId").post(adminlookupCtrl.getStatelistByCountryId);
router.route("/getCitylistByStateId").post(adminlookupCtrl.getCitylistByStateId);


module.exports = router;
