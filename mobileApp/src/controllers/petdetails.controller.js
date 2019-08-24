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
const petWeightTbl = db.TblActivityWeight;
const medicationTbl = db.TblMedication;


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
          console.log('Image Svaed Success...');
        }
      });
      // image conversion completed........
      var flag = 'insert';
      if (postData.petId != '') {
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
            parentFatherName: postData.parentFatherName,
            parentFatherBreedName: postData.parentFatherBreedName,
            parentAddress: postData.parentAddress,
            parenOwnerName: postData.parenOwnerName,
            parenMobileNumber: postData.parenMobileNumber,
            parentOwnerAddress: postData.parentOwnerAddress,
            drName: postData.drName,
            drhospitalName: postData.drhospitalName,
            drMobile: postData.drMobile,
            drEmail: postData.drEmail,
            drAddress: postData.drAddress,
            drCity: postData.drCity,
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
          parentFatherName: postData.parentFatherName,
          parentFatherBreedName: postData.parentFatherBreedName,
          parentAddress: postData.parentAddress,
          parenOwnerName: postData.parenOwnerName,
          parenMobileNumber: postData.parenMobileNumber,
          parentOwnerAddress: postData.parentOwnerAddress,
          drName: postData.drName,
          drhospitalName: postData.drhospitalName,
          drMobile: postData.drMobile,
          drEmail: postData.drEmail,
          drAddress: postData.drAddress,
          drCity: postData.drCity,
          drState: postData.drState,
          drCountry: postData.drCountry,
          status: postData.status
        }, {
            returning: true
          }).then(data => {
            res.json({ status: "success", msg: "Inserted Successfully" })
          })
      }
    }
    catch (err) {
      res.json({ status: "error", msg: "Inserted Unsuccessfully" })
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
          petName: updateData.petName,
          petCategoryId: updateData.petCategoryId,
          sex: updateData.sex,
          BreedId: updateData.breedId,
          dob: updateData.dob,
          color: updateData.color,
          photo: updateData.photo,
          ownerId: updateData.ownerId,
          monthlyCycle: updateData.monthlyCycle,
          weight: updateData.weight,
          status: updateData.status
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

  // const postRxMaster = async (req, res, next) => {

  //   try {

  //     const postData = req.body;
  //     console.log("postData========>", postData)
  //     var data = postData.Photo
  //     var pt = '';
  //     var date = new Date();
  //     var ptr = date.getFullYear() + "" + date.getMonth() + "" + date.getMilliseconds() + '.jpeg';
  //     pts = './public/' + ptr;
  //     fs.writeFile(pts, data, 'base64', (err) => {
  //       if (err)
  //         console.log(err)
  //       else {
  //         console.log('Image Svaed Success...');
  //       }
  //     });
  //     var flag = 'insert';
  //     if (postData.rxMasterId != undefined) {
  //       // console.log("inter", postData)
  //       const findPet = await RXMst.findAll(
  //         {
  //           where: { rxMasterId: postData.rxMasterId }
  //         });
  //       if (findPet.length > 0) {
  //         flag = 'update';
  //         if (flag == 'update') {
  //           //create
  //           console.log("Adding details into RxDtle table", postData)
  //           RxDlt.create(
  //             {
  //               petId: postData.petId,
  //               doctorId: postData.doctorId,
  //               durationFrom: postData.durationFrom,
  //               durationTo: postData.durationTo,
  //               rxDate: postData.rxDate,
  //               photo: ptr,
  //               active: postData.active,
  //             },
  //             {
  //               returning: true
  //             }).then(data => {
  //               console.log(data)
  //               res.json({ status: "success", msg: "Inserted Successfully" })
  //             })
  //         }
  //       }
  //     }
  //     else {
  //       console.log("========> adding data into RxMaster table", postData)
  //       const Masterd = RXMst.create({
  //         petId: postData.petId,
  //         rxDate: postData.rxDate,
  //         active: postData.active,
  //       }, {
  //           returning: true
  //         }).then(data => {
  //           console.log("========> adding data into RxDtl table", data)
  //           const masterDtl = RxDlt.create({
  //             rxMasterId: data.dataValues.rxMasterId,
  //             petId: postData.petId,
  //             doctorId: postData.doctorId,
  //             durationFrom: postData.durationFrom,
  //             durationTo: postData.durationTo,
  //             rxDate: postData.rxDate,
  //             photo: ptr,
  //             active: postData.active,
  //           })
  //           res.json({ status: "success", msg: "Inserted Successfully" })
  //         })
  //     }
  //   }
  //   catch (err) {
  //     res.json({ status: "error", msg: "Inserted Unsuccessfully" })
  //   };
  // }

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
    console.log("----------------------->>>postData", postData)
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
            petName: arrayItem.petName,
            status: arrayItem.status,
            breedId: arrayItem.breedId,
            petCategoryId: arrayItem.petCategoryId,
            photo: arrayItem.photo,
            monthlyCycle: arrayItem.monthlyCycle,
            status: arrayItem.status,
            monthlyCycle: arrayItem.monthlyCycle,
            dob: arrayItem.dob,
            period: arrayItem.period,
            height: arrayItem.height,
            weight: arrayItem.weight,
            color: arrayItem.color,
            marks: arrayItem.marks,
            parentFatherName: arrayItem.parentFatherName,
            parentFatherBreedName: arrayItem.parentFatherBreedName,
            parentAddress: arrayItem.parentAddress,
            parenOwnerName: arrayItem.parenOwnerName,
            parenMobileNumber: arrayItem.parenMobileNumber,
            parentOwnerAddress: arrayItem.parentOwnerAddress,
            drName: arrayItem.drName,
            drhospitalName: arrayItem.drhospitalName,
            drMobile: arrayItem.drMobile,
            drEmail: arrayItem.drEmail,
            drAddress: arrayItem.drAddress,
            drCity: arrayItem.drCity,
            drState: arrayItem.drState,
            drCountry: arrayItem.drCountry
          }
          _petMasterlist.push(obj);
        })
        const petMasterImport = await PetMaster.bulkCreate(
          _petMasterlist,
          {
            fields: ["petName", "breedId", "petCategoryId", "photo", "status", "sex", "monthlyCycle", "dob",
              "period", "height", "length", "weight", "color", "marks", "parentFatherName", "parentFatherBreedName",
              "parentAddress", "parenOwnerName", "parenMobileNumber", "parentOwnerAddress", "drName", "drhospitalName",
              "drMobile", "drEmail", "drAddress", "drCity", "drState", "drCountry"],
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
    getPetMasterById
  };
};


module.exports = petDetailsController();