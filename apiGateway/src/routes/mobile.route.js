const express = require("express");
const router = express.Router();
const petDetailCtrl = require("../controllers/petdetails.controller");
const mobilecmsCtrl = require("../controllers/cmsdetails.controller");
const mobilelookupCtrl = require("../controllers/lookup.controller");



// ------------------------petdetails-----------------------
router.route("/getPetCategory").post(petDetailCtrl.getPetCategory);
router.route("/getBreedTypeId").post(petDetailCtrl.getBreedTypeId);
router.route("/getBreedMaster").post(petDetailCtrl.getBreedMaster);
router.route("/getPetMaster").post(petDetailCtrl.getPetMaster);
router.route("/postPetMaster").post(petDetailCtrl.postPetMaster);
router.route("/deletePetdetails").post(petDetailCtrl.deletePetdetails);
router.route("/updatePetdetails").post(petDetailCtrl.updatePetdetails);
router.route("/getPetMasterById").post(petDetailCtrl.getPetMasterById);
router.route("/petMasterBulk").post(petDetailCtrl.petMstBulkInsert);

/*===================== Rx Routes ==========================*/
router.route("/getRxMaster").post(petDetailCtrl.getRxMaster);
router.route("/postRxMaster").post(petDetailCtrl.postRxMaster);
router.route("/postRxDtl").post(petDetailCtrl.postRxDtl);
router.route("/postRxFreq").post(petDetailCtrl.postRxFreq);
router.route("/deleteRxMaster").post(petDetailCtrl.deleteRxMaster);
router.route("/updateRxMaster").post(petDetailCtrl.updateRxMaster);

/*======================Medication Routes==================== */
router.route("/getMedication").post(petDetailCtrl.getMedication);   
router.route("/postMedication").post(petDetailCtrl.postMedication);
router.route("/getBrandmst").post(petDetailCtrl.getBrandmst);
router.route("/getActivity").post(petDetailCtrl.getActivity);
router.route("/rxMasterBulk").post(petDetailCtrl.rxMasterBulk);
router.route("/medBulkInsert").post(petDetailCtrl.medBulkInsert);
//=======================petWeight Routes========================
router.route("/postPetWeight").post(petDetailCtrl.postPetWeight);
router.route("/deletePetWeight").post(petDetailCtrl.deletePetWeight);
router.route("/getweightByDate").post(petDetailCtrl.getweightByDate);
router.route("/getweightByDate").post(petDetailCtrl.getweightByDate);
router.route("/petWeightBulk").post(petDetailCtrl.petWeightBulk);
//===========================Add Note Routes===================
router.route("/postNote").post(petDetailCtrl.postNote);
router.route("/addNoteBulk").post(petDetailCtrl.addNoteBulk);

//========================Medicine Routes===========================
router.route("/postMedicine").post(petDetailCtrl.postMedicine);
router.route("/deleteMedicine").post(petDetailCtrl.deleteMedicine);
router.route("/petMedicineBulk").post(petDetailCtrl.petMedicineBulk);

/*======================Image Routes==================== */
router.route("/deleteImage").post(petDetailCtrl.deleteImage);
router.route("/getImage").post(petDetailCtrl.getImage);
router.route("/getallimagebydate").post(petDetailCtrl.getallimagebydate);

router.route("/getMasterData").post(petDetailCtrl.getMasterData);


/*======================cms details Routes==================== */
router.route("/getCMSlist").post(mobilecmsCtrl.getCMSlist);
router.route("/addCMSdetails").post(mobilecmsCtrl.addCMSdetails);
router.route("/getCMSbyId").post(mobilecmsCtrl.getCMSbyId);
router.route("/updateCMSdetails").put(mobilecmsCtrl.updateCMSdetails );
router.route("/deleteCMSdetails").put(mobilecmsCtrl.deleteCMSdetails);


/*======================LookUp details Routes==================== */
router.route("/getCountry").post(mobilelookupCtrl.getCountry);
router.route("/getStateByCountryId").post(mobilelookupCtrl.getStateByCountryId);
router.route("/getCityByStateId").post(mobilelookupCtrl.getCityByStateId);



router.route("/addAppointment").post(mobilecmsCtrl.addAppointment);




module.exports = router;


