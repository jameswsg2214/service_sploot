const express = require("express");
const router = express.Router();
const mobileCtrl = require("../controllers/mobile.controller");
const petDetailCtrl = require("../controllers/petdetails.controller");




/** Users Routes */
router.route("/deleteUser").put(mobileCtrl.deleteUser);
router.route("/verifyOtp").post(mobileCtrl.verifyOtp);

/* Departments */
router.route("/getuserById").post(mobileCtrl.getuserById);

// ------------------------petdetails-----------------------
router.route("/getPetCategory").post(petDetailCtrl.getPetCategory);
router.route("/getBreedTypeId").post(petDetailCtrl.getBreedTypeId);
router.route("/getBreedMaster").post(petDetailCtrl.getBreedMaster);
router.route("/getPetMaster").post(petDetailCtrl.getPetMaster);
router.route("/postPetMaster").post(petDetailCtrl.postPetMaster);
router.route("/deletePetdetails").post(petDetailCtrl.deletePetdetails);
router.route("/updatePetdetails").post(petDetailCtrl.updatePetdetails);

router.route("/postPetWeight").post(petDetailCtrl.postPetWeight);

module.exports = router;
