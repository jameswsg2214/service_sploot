const express = require("express");
const router = express.Router();
const petDetailCtrl = require("../controllers/petdetails.controller");

// ------------------------petdetails-----------------------
router.route("/getPetCategory").post(petDetailCtrl.getPetCategory);
router.route("/getBreedTypeId").post(petDetailCtrl.getBreedTypeId);
router.route("/getBreedMaster").post(petDetailCtrl.getBreedMaster);
router.route("/getPetMaster").post(petDetailCtrl.getPetMaster);
router.route("/postPetMaster").post(petDetailCtrl.postPetMaster);
router.route("/deletePetdetails").post(petDetailCtrl.deletePetdetails);
router.route("/updatePetdetails").post(petDetailCtrl.updatePetdetails);
router.route("/postPetWeight").post(petDetailCtrl.postPetWeight);
router.route("/postRx").post(petDetailCtrl.postRx);
router.route("/deleteRx").post(petDetailCtrl.deleteRx);


router.route("/deletePetWeight").post(petDetailCtrl.deletePetWeight);

module.exports = router;
