const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")

const petCategory = db.PetCategory;
const breedTypeId = db.BreedTypeID;
const petMaster = db.PetMaster;
const breedMaster = db.BreedMaster;


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
      const data = await breedTypeId.findAll({
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
      /* Country Data */
      const pet = await petMaster.findAll({
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

        const postData = req.body;

        // image conversion

        var data = postData.Photo
        var pt = '';
        var date = new Date();
        var ptr = date.getFullYear() +""+ date.getMonth()+"" + date.getMilliseconds()+'.jpeg';
        pts = './public/'+ ptr;
         fs.writeFile(pts, data,'base64', (err) => {
            if(err)
            console.log(err)
            else{
                console.log('Image Svaed Success...');
            }
        });
    
        ptr = 'http://localhost:4000/'+ptr;

        // image conversion completed........
        
        const Petdata = await petMaster.create({
          PetName: postData.PetName,
          PetCategoryId: postData.PetCategoryId,
          Sex: postData.Sex,
          BreedId: postData.BreedId,
          DOB: postData.DOB,
          Color: postData.Color,
          Photo: ptr,
          OwnerId: postData.OwnerId,
          MonthlyCycle: postData.MonthlyCycle,
          Period: postData.Period,
          Weight: postData.Weight,
          Status: postData.status
        }, {
            returning: true,
          })
          console.log(Petdata)
  };



  // --------------------------------------------return----------------------------------
  return {
    getPetCategory,
    getBreedTypeId,
    getPetMaster,
    getBreedMaster,
    postPetMaster
  };
};


module.exports = petDetailsController();