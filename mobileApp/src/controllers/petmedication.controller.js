const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");


const Medicationdb = db.TblMedication;
const brandmed = db.TblbrandMaster;


const metMedicationController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */


  ////////////get medication ////////////////////////
  const getMedication = async (req, res, next) => {
    const postData = req.body;
    console.log("=============>Get medication", postData)

    try {
      /* Country Data */
      const met = await Medicationdb.findAll({
        where: {
          medicationId: postData.medicationId
        }
      });
      if (!met) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)  
        .json({ status: "success", req: postData, res: met });
    }
    catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }

  };


  ////post medication///////////////////

  const postMedication = async (req, res, next) => {

    try {
      const medData = req.body;
      console.log("===============>>>>>Post med data", medData)
      var flag = 'insert';
      if (medData.medicationId != undefined) {
        console.log("medicationId")
        const findMed = await Medicationdb.findAll(
          {
            where: { medicationId: medData.medicationId }
          });
        if (findMed.length > 0) {
          flag = 'update';
        }
      }

      if (flag == 'update') {
        //update
        console.log("findPet==========>>>>>>>>>>>>")
        Medicationdb.update(
          {
            petCategoryId: medData.petCategoryId,
            brandId: medData.brandId,
            drugName: medData.drugName,
            drugType: medData.drugType,
            route: medData.route,
            age: medData.age,
            dose: medData.dose,
            userId: medData.userId
          },
          {
            where: {
              medicationId: medData.medicationId
            }
          }
        )
          .then(() => {
            return res.status(httpStatus.OK).json({
              status: "success", msg: "Updated Successfully", req: medData
            });
          })
          .catch(() => {
            return res.status(httpStatus.OK).json({
              status: "error", msg: "Updation failed"
            });
          })
      }
      else {
        console.log("undefined")
        const metdata = Medicationdb.create({
          medicationId: medData.medicationId,
          petCategoryId: medData.petCategoryId,
          brandId: medData.brandId,
          drugName: medData.drugName,
          drugType: medData.drugType,
          route: medData.route,
          age: medData.age,
          dose: medData.dose,
          userId: medData.userId,
          medDate: medData.medDate
        }, {
            returning: true
          })
          .then(data => {
            console.log(data)
            res.json({ status: "success", msg: "Inserted Successfully", req: medData })
          })
      }

    }
    catch (err) {
      console.log(err);
      res.json({ status: "error", msg: "Inserted Unsuccessfully" })
    };


  }



  ////////////////////  medication bulkpost////////////

  const medBulkInsert = async (req, res, next) => {


    console.log("bulk insert working...............")

    const medlist = req.body;
    if (medlist.length > 0) {
      try {
        var _medlist = [];
        medlist.forEach(function (arrayItem) {
          const obj = {
            medicationId: arrayItem.medicationId,
            petCategoryId: arrayItem.petCategoryId,
            brandId: arrayItem.brandId,
            drugName: arrayItem.drugName,
            drugType: arrayItem.drugType,
            route: arrayItem.route,
            age: arrayItem.age,
            dose: arrayItem.dose,
            userId: arrayItem.userId,
            medDate: arrayItem.medDate
          }
          _medlist.push(obj);
        })
        console.log("-----------------------------__>>>>>>>>>>>>>>>>>_medlist", _medlist)
        const medImport = await Medicationdb.bulkCreate(
          _medlist,
          {
            fields: ["medicationId", "petCategoryId", "brandId", "drugName", "drugType", "route", "age", "dose", "userId", "medDate", ''],
            updateOnDuplicate: ["drugName"],
          },
          {
            returning: true
          })
        return res.status(httpStatus.OK).json({ req: medlist, res: medImport });
      }
      catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
      }
    }
  }

  ////////////// get brand master////////////////

  const getBrandmst = async (req, res, next) => {

    const postData = req.body;
    console.log("=============>Get brand master", postData)

    try {
      / Country Data /
      const met = await brandmed.findAll({
        where: {
          brandId: postData.brandId
        }
      });
      if (!met) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Master Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", req:postData,res: met });
    }
    catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };


  //////////////////////////////post bulk brand master////////////////////////

  const postbulkbrand = async (req, res, next) => {

    console.log("post brand working...............")


    const brndlist = req.body;
    if (brndlist.length > 0) {
      try {
        var _brndlist = [];
        brndlist.forEach(function (arrayyItem) {
          const obj = {
            brandId: arrayyItem.brandId,
            brandName: arrayyItem.brandName,
            brndDate: arrayyItem.brndDate,
          }
          _brndlist.push(obj);
        })
        console.log("-----------------------------__>>>>>>>>>>>>>>>>>_brndlist", _brndlist)
        const medImport = await brandmed.bulkCreate(
          _brndlist,
          {
            fields: ["brandId", "brandName", "brndDate", ''],
            updateOnDuplicate: ["brandName"],
          },
          {
            returning: true
          })
        return res.status(httpStatus.OK).json({req:brndlist, res: medImport });
      }
      catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
      }
    }

  }

  ///////////////////////post brand mst///////////////

  const postbrandmst = async (req, res, next) => {

    console.log("post brand working.....................")

    try {
      const brndData = req.body;
      console.log("===============>>>>>Post brand data", brndData)
      var flag = 'insert';
      if (brndData.brandId != undefined) {
        console.log("brandId")
        const findbrnd = await brandmed.findAll(
          {
            where: { brandId: brndData.brandId }
          });
        if (findbrnd.length > 0) {
          flag = 'update';
        }
      }

      if (flag == 'update') {
        //update
        console.log("find brand==========>>>>>>>>>>>>")
        brandmed.update(
          {
            brandId: brndData.brandId,
            brandName: brndData.brandName,
            brndDate: brndData.brndDate
          },
          {
            where: {
              brandId: brndData.brandId
            }
          }
        )
          .then(() => {
            return res.status(httpStatus.OK).json({
              status: "success", msg: "Updated Successfully", req:brndData
            });
          })
          .catch(() => {
            return res.status(httpStatus.OK).json({
              status: "error", msg: "Updation failed"
            });
          })
      }
      else {
        console.log("undefined")
        const brndddata = brandmed.create({

          brandId: brndData.brandId,
          brandName: brndData.brandName,
          brndDate: brndData.brndDate
        }, {
            returning: true
          })
          .then(data => {
            console.log(data)
            res.json({ status: "success", msg: "Inserted Successfully",req:brndData })
          })
      }

    }
    catch (err) {
      console.log(err);
      res.json({ status: "error", msg: "Failed to insert" })
    };
  }

  return {
    getMedication,
    postMedication,
    getBrandmst,
    medBulkInsert,
    postbrandmst,
    postbulkbrand
  };
};

module.exports = metMedicationController();