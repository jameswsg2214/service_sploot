const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");

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

    const data = req.body;
    console.log(data)
    if (data) {
      try {
        console.log("hi1")
        const pet = await petMaster.findOne({
          where: {
            PetId: data.PetId
          }
        }).catch(err => {
          console.log("error")

          const errorMsg = err.errors ? err.errors[0].message : err.message;
          return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
        })
        if (pet) {
          console.log("hi2")
          return res.status(httpStatus.BAD_REQUEST).json({ msg: "PetMaster already Exist" });
        } else {
          try {
            console.log("hi3")
            const postData = req.body;
            console.log('postdata', postData)
            const Petdata = await petMaster.create({
              PetId: postData.PetId,
              PetName: postData.PetName,
              PetCategoryId: postData.PetCategoryId,
              Sex: postData.Sex,
              BreedId: postData.BreedId,
              DOB: postData.DOB,
              Color: postData.Color,
              Photo: postData.Photo,
              OwnerId: postData.OwnerId,
              MonthlyCycleId: postData.MonthlyCycleId,
              Weight: postData.Weight
            }, {
                returning: true
              })
          } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error1" });
          }
        }
      } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error2" });

      };
    };
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