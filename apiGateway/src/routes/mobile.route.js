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

/*===================== Rx Routes ==========================*/
router.route("/getRxMaster").post(petDetailCtrl.getRxMaster);
router.route("/postRxMaster").post(petDetailCtrl.postRxMaster);
router.route("/postRxDtl").post(petDetailCtrl.postRxDtl);
router.route("/postRxFreq").post(petDetailCtrl.postRxFreq);
router.route("/deleteRxMaster").post(petDetailCtrl.deleteRxMaster);
router.route("/updateRxMaster").post(petDetailCtrl.updateRxMaster);
router.route("/getMedication").post(petDetailCtrl.getMedication);
router.route("/getBrandmst").post(petDetailCtrl.getBrandmst);

router.route("/deletePetWeight").post(petDetailCtrl.deletePetWeight);
router.route("/getweightByDate").post(petDetailCtrl.getweightByDate);
module.exports = router;


