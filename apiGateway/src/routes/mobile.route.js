const express = require("express");
const router = express.Router();
const mobileCtrl = require("../controllers/mobile.controller");
const petDetailCtrl = require("../controllers/petdetails.controller");




/** Users Routes */
router.route("/deleteUser").put(mobileCtrl.deleteUser);
router.route("/createUser").post(mobileCtrl.createUser);
router.route("/verifyOtp").post(mobileCtrl.verifyOtp);

/* Departments */
router.route("/getuserById").post(mobileCtrl.getuserById);

// ------------------------petdetails-----------------------
router.route("/getPetCategory").post(petDetailCtrl.getPetCategory);
router.route("/getBreedTypeId").post(petDetailCtrl.getBreedTypeId);
router.route("/getBreedMaster").post(petDetailCtrl.getBreedMaster);
router.route("/getPetMaster").post(petDetailCtrl.getPetMaster);
router.route("/postPetMaster").post(petDetailCtrl.postPetMaster);

module.exports = router;
