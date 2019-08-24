const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

/*================ Core components =========================*/
const petdetailsCtrl = require("../controllers/petdetails.controller");
const petWeightCtrl = require("../controllers/petweight");
const petMedicationCtrl = require('../controllers/petmedication.controller')
const noteCtrl = require ('../controllers/note.controller')
/*====================== Pet details Routes =====================*/

router.route("/getPetCategory").post(petdetailsCtrl.getPetCategory);
router.route("/getBreedTypeId").post(petdetailsCtrl.getBreedTypeId);
router.route("/getBreedMaster").post(petdetailsCtrl.getBreedMaster);
router.route("/getPetMaster").post(petdetailsCtrl.getPetMaster);
router.route("/postPetMaster").post(petdetailsCtrl.postPetMaster);
router.route("/deletePetdetails").post(petdetailsCtrl.deletePetdetails);
router.route("/updatePetdetails").post(petdetailsCtrl.updatePetdetails);
router.route("/petMasterBulk").post(petdetailsCtrl.petMstBulkInsert);
router.route("/getPetMasterById").post(petdetailsCtrl.getPetMasterById);

router.route("/postPetWeight").post(petWeightCtrl.postPetWeight);

/*====================== Rx Routes =====================*/
router.route("/getRxMaster").post(petdetailsCtrl.getRxMaster)
router.route("/postRxMaster").post(petdetailsCtrl.postRxMaster);
router.route("/postRxDtl").post(petdetailsCtrl.postRxDtl);
router.route("/postRxFreq").post(petdetailsCtrl.postRxFreq);
router.route("/deleteRxMaster").post(petdetailsCtrl.deleteRxMaster);
router.route("/updateRxMaster").post(petdetailsCtrl.updateRxMaster);
router.route("/getActivity").post(petdetailsCtrl.getActivity);
router.route("/rxMasterBulk").post(petdetailsCtrl.rxMasterBulk);

router.route("/deletepetweight").post(petWeightCtrl.deletepetweight);
router.route("/getweightByDate").post(petWeightCtrl.getweightByDate);

/*===================Medication Routes==========================*/
router.route("/getMedication").post(petMedicationCtrl.getMedication);
router.route("/postMedication").post(petMedicationCtrl.postMedication);
router.route("/getBrandmst").post(petMedicationCtrl.getBrandmst);
router.route("/petWeightBulk").post(petWeightCtrl.petWeightBulk);
router.route("/addNoteBulk").post(noteCtrl.addNoteBulk);
router.route("/medBulkInsert").post(petMedicationCtrl.medBulkInsert)



router.route("/postNote").post(noteCtrl.postNote);

module.exports = router;
