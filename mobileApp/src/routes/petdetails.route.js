const express = require("express");
const petdetailsCtrl = require("../controllers/petdetails.controller");
const petWeightCtrl = require("../controllers/petweight")

// const multer = require("multer");
const router = express.Router(); // eslint-disable-line new-cap

router.route("/getPetCategory").post(petdetailsCtrl.getPetCategory);
router.route("/getBreedTypeId").post(petdetailsCtrl.getBreedTypeId);
router.route("/getBreedMaster").post(petdetailsCtrl.getBreedMaster);
router.route("/getPetMaster").post(petdetailsCtrl.getPetMaster);
router.route("/postPetMaster").post(petdetailsCtrl.postPetMaster);
router.route("/deletePetdetails").post(petdetailsCtrl.deletePetdetails);
router.route("/updatePetdetails").post(petdetailsCtrl.updatePetdetails);

router.route("/postPetWeight").post(petWeightCtrl.postPetWeight);
router.route("/postRx").post(petdetailsCtrl.postRx);

router.route("/deleteRx").post(petdetailsCtrl.deleteRx);





module.exports = router;