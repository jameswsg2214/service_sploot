const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")

const petCategory = db.TblPetCategory;
const breedType = db.TblBreedType;
const PetMaster = db.TblPetMaster;
const breedMaster = db.TblBreedMaster;
const RxDlt = db.TblActivityRxDtl;
const RXMst = db.TblActivityRxMaster;
const RxFreq = db.TblActivityRxFreq;
const petWeightTbl = db.TblActi
const medicationTbl = db.TblMedication;
const brandMaster = db.TblbrandMaster;
const medicinedb = db.TblActivityMedicine;
const taskCategory = db.TblTaskCategory;




const petDetailsController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

  const getPetCategory = async (req, res, next) => {
    try {
      /* Country Data */
      const pet = await petCategory.findAll({
      });
      if (!pet) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", petcategorydetails: pet });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };

  const getBreedTypeId = async (req, res, next) => {
    try {
      /* Country Data */
      const data = await breedType.findAll({
      });
      if (!data) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", breedData: data });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };

  const getPetMaster = async (req, res, next) => {
    try {
      const pet = await PetMaster.findAll({
      });
      if (!pet) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", petMasterDetails: pet });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };

  const getBreedMaster = async (req, res, next) => {
    try {
      /* Country Data */
      const data = await breedMaster.findAll({
      });
      if (!data) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", breedMasterDetails: data });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };

  const postPetMaster = async (req, res, next) => {

    try {

      const postData = req.body;

      var data = postData.Photo
      var pt = '';
      var date = new Date();
      var ptr = date.getFullYear() + "" + date.getMonth() + "" + date.getMilliseconds() + '.jpeg';
      pts = './public/' + ptr;
      fs.writeFile(pts, data, 'base64', (err) => {
        if (err)
          console.log(err)
        else {
          console.log('Image Saved Success...');
        }
      });
      // image conversion completed........
      var flag = 'insert';
      if (postData.petId != undefined) {

        const findPet = await PetMaster.findAll(
          {
            where: { petId: postData.petId }
          });
        if (findPet.length > 0) {
          flag = 'update';
        }
      }

      if (flag == 'update') {
        //update
        PetMaster.update(
          {
            userId: postData.userId,
            petCategoryId: postData.petCategoryId,
            photo: ptr,
            petName: postData.petName,  
            breedId: postData.breedId,
            sex: postData.sex,
            dob: postData.dob,
            monthlyCycle: postData.monthlyCycle,
            period: postData.period,
            height: postData.height,
            length: postData.length,
            weight: postData.weight,
            color: postData.color,
            marks: postData.marks,
            birthPlace: postData.birthPlace,
            parentFatherName: postData.parentFatherName,
            parentFatherBreedName: postData.parentFatherBreedName,
            parentMotherName: postData.parentMotherName,
            parentMotherBreedName: postData.parentMotherBreedName,
            parentAddress: postData.parentAddress,
            petOwnerName: postData.petOwnerName,
            petOwnerMobileNumber: postData.petOwnerMobileNumber,
            petOwnerAddress: postData.petOwnerAddress,
            drName: postData.drName,
            drhospitalName: postData.drhospitalName,
            drMobile: postData.drMobile,
            drEmail: postData.drEmail,
            drAddress: postData.drAddress,
            drCity: postData.drCity,
            drPincode: postData.drPincode,
            drState: postData.drState,
            drCountry: postData.drCountry,
            status: postData.status
          },
          {
            where: {
              petId: postData.petId
            }
          }
        )
          .then(() => {
            return res.status(httpStatus.OK).json({
              status: "success", msg: "Updated Successfully"
            });
          })
          .catch(() => {
            return res.status(httpStatus.OK).json({
              status: "error", msg: "Updation failed"
            });
          })
      }
      else {
        
        const Petdata = PetMaster.create({
          userId: postData.userId,
          petCategoryId: postData.petCategoryId,
          photo: ptr,
          petName: postData.petName,
          breedId: postData.breedId,
          sex: postData.sex,
          dob: postData.dob,
          monthlyCycle: postData.monthlyCycle,
          period: postData.period,
          height: postData.height,
          length: postData.length,
          weight: postData.weight,
          color: postData.color,
          marks: postData.marks,
          birthPlace: postData.birthPlace,
          parentFatherName: postData.parentFatherName,
          parentFatherBreedName: postData.parentFatherBreedName,
          parentMotherName: postData.parentMotherName,
          parentMotherBreedName: postData.parentMotherBreedName,
          parentAddress: postData.parentAddress,
          petOwnerName: postData.petOwnerName,
          petOwnerMobileNumber: postData.petOwnerMobileNumber,
          petOwnerAddress: postData.petOwnerAddress,
          drName: postData.drName,
          drhospitalName: postData.drhospitalName,
          drMobile: postData.drMobile,
          drEmail: postData.drEmail,
          drAddress: postData.drAddress,
          drCity: postData.drCity,
          drPincode: postData.drPincode,
          drState: postData.drState,
          drCountry: postData.drCountry,
          status: postData.status
        }, {
            returning: true
          }).then(data => {
            res.json({ status: "success", msg: "Inserted Successfully" })
          }).catch(err =>{
            console.log(err)
            res.json({status:"error", msg: "Not Inserted"})
          })
      }
    }
    catch (err) {
      res.json({ status: "error", msg: "Internal server error" })
    };
  };

  const deletePetdetails = async (req, res, next) => {
    try {
      const data = await PetMaster.update(
        { Status: '0' },
        {
          where: {
            petId: req.body.petId
          }
        }
      )
      if (!data) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", breedData: data });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };

  const updatePetdetails = async (req, res, next) => {
    updateData = req.body
    try {
      const data = await PetMaster.update(
        {
          userId: postData.userId,
            petCategoryId: postData.petCategoryId,
            photo: ptr,
            petName: postData.petName,
            breedId: postData.breedId,
            sex: postData.sex,
            dob: postData.dob,
            monthlyCycle: postData.monthlyCycle,
            period: postData.period,
            height: postData.height,
            length: postData.length,
            weight: postData.weight,
            color: postData.color,
            marks: postData.marks,
            birthPlace: postData.birthPlace,
            parentFatherName: postData.parentFatherName,
            parentFatherBreedName: postData.parentFatherBreedName,
            parentMotherName: postData.parentMotherName,
            parentMotherBreedName: postData.parentMotherBreedName,
            parentAddress: postData.parentAddress,
            petOwnerName: postData.petOwnerName,
            petOwnerMobileNumber: postData.petOwnerMobileNumber,
            petOwnerAddress: postData.petOwnerAddress,
            drName: postData.drName,
            drhospitalName: postData.drhospitalName,
            drMobile: postData.drMobile,
            drEmail: postData.drEmail,
            drAddress: postData.drAddress,
            drCity: postData.drCity,
            drPincode: postData.drPincode,
            drState: postData.drState,
            drCountry: postData.drCountry,
            status: postData.status
        },
        {
          where: {
            petId: updateData.petId,
          }
        }
      )
      if (!data) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", breedData: data });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };

  /*=============== Prescription API's =================*/
   
  const getRxMaster = async (req, res, next) => {
    try {
      /* Country Data */
      const rxMst = await RXMst.findAll({
      });
      if (!rxMst) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", rxMasterDetails: rxMst });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };

  const postRxMaster = async (req, res, next) => {

    try {
      const postData = req.body;
      console.log("postData========>", postData)
      var data = postData.Photo
      var pt = '';
      var date = new Date();
      var ptr = date.getFullYear() + "" + date.getMonth() + "" + date.getMilliseconds() + '.jpeg';
      pts = './public/' + ptr;
      fs.writeFile(pts, data, 'base64', (err) => {
        if (err)
          console.log(err)
        else {
          console.log('Image Svaed Success...');
        }
      });
      if (postData) {
        RXMst.create(
          {
            petId: postData.petId,
            doctorId: postData.doctorId,
            durationFrom: postData.durationFrom,
            durationTo: postData.durationTo,
            rxDate: postData.rxDate,
            photo: ptr,
            active: postData.active,
          },
          {
            returning: true
          }).then(data => {
            console.log(data)
            res.send({ status: "success", msg: "Inserted Successfully", data: data })
          })
      }
      else {
        res.send({ status: 'failed', msg: 'Please enter prescription data' })
      }
    }
    catch (err) {
      res.json({ status: "error", msg: "Inserted Unsuccessfully" })
    };
  }

  const postRxDtl = async (req, res, next) => {
    const postData = req.body;
    if (postData) {
      await RxDlt.create(
        {
          rxMasterId: postData.rxMasterId,
          medicationId: postData.medicationId,
          startDate: postData.startDate,
          endDate: postData.endDate,
          active: postData.active,
        },
        {
          returning: true
        }).then(data => {
          console.log(data)
          res.send({ status: "success", msg: "Inserted Successfully", data: data })
        }).catch(err => {
          res.send({ status: "failed", msg: "failed to insert data", error: err })
        })
    }
    else {
      res.send({ status: 'failed', msg: 'Please enter medicine data' })
    }
  }

  const postRxFreq = async (req, res, next) => {
    const postData = req.body;
    if (postData) {
      await RxFreq.create(
        {
          rxDtlId: postData.rxDtlId,
          freqInTake: postData.freqInTake,
          active: postData.active,
        },
        {
          returning: true
        }).then(data => {
          res.send({ status: "success", msg: "Inserted Successfully", data: data })
        }).catch(err => {
          res.send({ status: "failed", msg: "failed to insert data", error: err })
        })
    }
    else {
      res.send({ status: 'failed', msg: 'Please enter medicine data' })
    }
  }

  const deleteRxMaster = async (req, res, next) => {
    const postData = req.body
    await RXMst.update(
      { active: '0' },
      {
        where: {
          rxMasterId: postData.rxMasterId
        }
      }
    ).then((data) => {
      res.send({ status: "success", msg: "Deleted Successfully", data: data })
    }).catch(err => {
      res.send({ status: "failed", msg: "failed to delete data", error: err })
    })
  }

  const updateRxMaster = async (req, res, next) => {
    const postData = req.body
    await RXMst.update(
      {
        petId: postData.petId,
        doctorId: postData.doctorId,
        durationFrom: postData.durationFrom,
        durationTo: postData.durationTo,
        rxDate: postData.rxDate,
        active: postData.active,
      },
      {
        where: {
          rxMasterId: postData.rxMasterId
        }
      }
    ).then((data) => {
      res.send({ status: "success", msg: "Updated Successfully", data: data })
    }).catch(err => {
      res.send({ status: "failed", msg: "failed to update data", error: err })
    })
  }

  const getActivity = async (req, res, next) => {
    /* Activity Data */
    const postData = req.body;
    finalData = []
    petWeightTbl.findOne({
      where: {
        weighDate: postData.Date
      }
    }).then(async (weighData) => {
      const weightData = { weightData: weighData }
      finalData.push(weightData)
      //weightData == null ? res.send({ status: "failed", msg: "weight data is empty" }) : res.send({ status: "failed", weightData: weightData })
    })
      .catch(err => { res.send({ status: "failed", error: err }) })
    await RXMst.findOne({
      where: {
        rxDate: postData.Date
      }
    }).then(async (rxData) => {
      const rxMasterData = { rxData: rxData }
      finalData.push(rxMasterData)
      // rxData == null ? res.send({ status: "failed", msg: "rx data is empty" }) : res.send({ status: "failed", rxData: rxData })
      await RxDlt.findAll({
        where: {
          rxMasterId: rxData.rxMasterId
        }
      }).then(async (rxDtl) => {
        // res.send({ data: rxDtl })
        let j = 0, k = rxDtl.length

        console.log(k)
        await rxDtl.forEach(async (item, i) => {
          const medicationId = item.dataValues.medicationId
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', medicationId)
          await medicationTbl.findOne({
            where: {
              medicationId: medicationId
            }
          })
            .then(async (medDtl) => {
              console.log(j, k);
              if (medDtl) {
                finalData.push(medDtl.dataValues)
                if (j == k - 1) {
                  console.log('===========78888888888', j, k - 1, finalData)
                  res.send({ finalData });
                } else {
                  j++
                }
              } else {
                j++
              }
            })
        })
      })
    })
  };

  const rxMasterBulk = async (req, res, next) => {
    const rxMasterList = req.body;
    if (rxMasterList.length > 0) {
      try {
        var _rxMasterList = [];
        rxMasterList.forEach(function (arrayItem) {
          const obj = {
            petId: arrayItem.petId,
            doctorId: arrayItem.doctorId,
            durationFrom: arrayItem.durationFrom,
            durationTo: arrayItem.durationTo,
            rxDate: arrayItem.rxDate,
            photo: arrayItem.photo,
            active: "1"
          }
          _rxMasterList.push(obj);
        })
        console.log("-----------------------------__>>>>>>>>>>>>>>>>>_rxMasterList", _rxMasterList)
        const rxMasterImport = await RXMst.bulkCreate(
          _rxMasterList,
          {
            fields: ["petId", "doctorId", "durationFrom", "durationTo", "rxDate", "photo", "active"],
            updateOnDuplicate: ["rxDate"],
          },
          {
            returning: true
          })
        return res.status(httpStatus.OK).json({ rxMasterImport });
      }
      catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
      }
    }
  };
  
  const getPetMasterById = async (req, res, next) => {
    const postData = req.body
    try {
      const pet = await PetMaster.findAll({
        where: { petId: postData.petId }
      });
      if (pet == '' || pet == undefined) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      else {
        return res
          .status(httpStatus.OK)
          .json({ status: "success", petMasterDetailsById: pet });
      }

    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };



  // BULK PETMASTER
  const petMstBulkInsert = async (req, res, next) => {
    const petMasterlist = req.body;
    if (petMasterlist.length > 0) {
      try {
        var _petMasterlist = [];
        petMasterlist.forEach(function (arrayItem) {
          const obj = {
            userId: arrayItem.userId,
            petCategoryId: arrayItem.petCategoryId,
            photo: arrayItem.photo,
            petName: arrayItem.petName,
            breedId: arrayItem.breedId,
            sex: arrayItem.sex,
            dob: arrayItem.dob,
            monthlyCycle: arrayItem.monthlyCycle,
            period: arrayItem.period,
            height: arrayItem.height,
            length: arrayItem.length,
            weight: arrayItem.weight,
            color: arrayItem.color,
            marks: arrayItem.marks,
            birthPlace: arrayItem.birthPlace,
            parentFatherName: arrayItem.parentFatherName,
            parentFatherBreedName: arrayItem.parentFatherBreedName,
            parentMotherName: arrayItem.parentMotherName,
            parentMotherBreedName: arrayItem.parentMotherBreedName,
            parentAddress: arrayItem.parentAddress,
            petOwnerName: arrayItem.petOwnerName,
            petOwnerMobileNumber: arrayItem.petOwnerMobileNumber,
            petOwnerAddress: arrayItem.petOwnerAddress,
            drName: arrayItem.drName,
            drhospitalName: arrayItem.drhospitalName,
            drMobile: arrayItem.drMobile,
            drEmail: arrayItem.drEmail,
            drAddress: arrayItem.drAddress,
            drCity: arrayItem.drCity,
            drPincode: arrayItem.drPincode,
            drState: arrayItem.drState,
            drCountry: arrayItem.drCountry,
            status: arrayItem.status
          }
          _petMasterlist.push(obj);
        })
        const petMasterImport = await PetMaster.bulkCreate(
          _petMasterlist,
          {
            fields: ["petName", "userId","petCategoryId", "breedId", "photo", "status", "sex", "monthlyCycle", "dob","period", "height", "length", "weight", "color", "marks","birthPlace", "parentFatherName", "parentFatherBreedName","parentMotherName", "parentMotherBreedName","parentAddress", "petOwnerName", "petMobileNumber","petOwnerAddress", "drName", "drhospitalName", "drMobile", "drEmail", "drAddress", "drCity","drPincode", "drState", "drCountry"],
            updateOnDuplicate: ["petName"],
          },
          {
            returning: true
          })
        return res.status(httpStatus.OK).json({ petMasterImport });
      }
      catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
      }
    }
  };
  //bulk completed

  const getMasterData = async(req,res,next)=>{
    let masterData = []
      await brandMaster.findAll().then((data)=>{
        masterData.push({BrandMasterdata:data})
      })
      await breedMaster.findAll({where:{active:'1'}}).then((data)=>{
        masterData.push({BreedMasterData:data})
      })
      await medicinedb.findAll({where:{active:'1'}}).then((data)=>{
        masterData.push({MedicineMasterData:data})
      })
      await breedType.findAll({where:{active:'1'}}).then((data)=>{
        masterData.push({BreedTypeMasterData:data})
      })
      await RxFreq.findAll({where:{active:'1'}}).then((data)=>{
        masterData.push({RxFreqMasterData:data})
      })
      await petCategory.findAll({where:{active:'1'}}).then((data)=>{
        masterData.push({PetCategoryMasterData:data})
      })
      await taskCategory.findAll({where:{active:'1'}}).then((data)=>{
        masterData.push({TaskCategoryMasterData:data})
      })
      res.send({masterData: masterData})
  }
  // --------------------------------------------return----------------------------------
  return {
    getPetCategory,
    getBreedTypeId,
    getPetMaster,
    getBreedMaster,
    postPetMaster,
    deletePetdetails,
    updatePetdetails,
    getRxMaster,
    postRxMaster,
    postRxDtl,
    postRxFreq,
    deleteRxMaster,
    updateRxMaster,
    getActivity,
    rxMasterBulk,
    petMstBulkInsert,
    getPetMasterById,
    getMasterData
  };
};


module.exports = petDetailsController();