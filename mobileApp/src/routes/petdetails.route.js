const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

/*================ Core components =========================*/
const petdetailsCtrl = require("../controllers/petdetails.controller");
const petWeightCtrl = require("../controllers/petweight");
const petMedicationCtrl = require('../controllers/petmedication.controller')

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
router.route("/postFreqDtl").post(petdetailsCtrl.postFreqDtl);
router.route("/deleteRxMaster").post(petdetailsCtrl.deleteRxMaster);
router.route("/updateRxMaster").post(petdetailsCtrl.updateRxMaster);
router.route("/getActivity").post(petdetailsCtrl.getActivity);

router.route("/deletepetweight").post(petWeightCtrl.deletepetweight);
router.route("/getweightByDate").post(petWeightCtrl.getweightByDate);
router.route("/getMedication").post(petMedicationCtrl.getMedication);
router.route("/getBrandmst").post(petMedicationCtrl.getBrandmst)

module.exports = router;