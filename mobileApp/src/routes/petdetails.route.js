const express = require("express");
const petdetailsCtrl = require("../controllers/petdetails.controller");
const petWeightCtrl = require("../controllers/petweight");
const petMedicationCtrl = require('../controllers/petmedication.controller')

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

/*====================== Rx Routes =====================*/
router.route("/postRxMaster").post(petdetailsCtrl.postRxMaster);
router.route("/postRxDtl").post(petdetailsCtrl.postRxDtl);
router.route("/postFreqDtl").post(petdetailsCtrl.postFreqDtl);


router.route("/deleteRx").post(petdetailsCtrl.deleteRx);

router.route("/deletepetweight").post(petWeightCtrl.deletepetweight);

router.route("/getMedication").post(petMedicationCtrl.getMedication);
router.route("/getbrandmst").post(petMedicationCtrl.getbrandmst)

module.exports = router;