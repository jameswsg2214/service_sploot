const express = require("express");
const petdetailsCtrl = require("../controllers/petdetails.controller");

// const multer = require("multer");
const router = express.Router(); // eslint-disable-line new-cap

router.route("/getPetCategory").post(petdetailsCtrl.getPetCategory);
router.route("/getBreedTypeId").post(petdetailsCtrl.getBreedTypeId);
router.route("/getBreedMaster").post(petdetailsCtrl.getBreedMaster);
router.route("/getPetMaster").post(petdetailsCtrl.getPetMaster);
router.route("/postPetMaster").post(petdetailsCtrl.postPetMaster);


module.exports = router;