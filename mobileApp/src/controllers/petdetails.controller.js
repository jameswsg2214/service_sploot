const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")

const petCategory = db.TblPetCategory;
const breedType = db.TblBreedType;
const PetMaster = db.TblPetMaster;
const breedMaster = db.TblBreedMaster;


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
        if (findPet.length >0) {
          flag='update';
        }
      }

      if(flag == 'update')
      {
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

  // --------------------------------------------return----------------------------------
  return {
    getPetCategory,
    getBreedTypeId,
    getPetMaster,
    getBreedMaster,
    postPetMaster,
    deletePetdetails,
    updatePetdetails
  };
};


module.exports = petDetailsController();