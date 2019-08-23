const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");


const Medication = db.TblMedication;
const brandmed = db.TblbrandMaster;


const metMedicationController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
	const getMedication  = async (req, res, next) => {
        const postData = req.body; 
        console.log("=============>Get medication",postData)

          try {
              /* Country Data */
              const met = await brandmed.findAll({
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
                .json({ status: "success", petcategorydetails: met });
            } 
            catch (err) {
              const errorMsg = err.errors ? err.errors[0].message : err.message;
              return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: "error", msg: errorMsg });
            }
	
	};

  const getBrandmst = async(req, res, next) => {

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
    .json({ status: "success", brandmastdetails: met });
    }
    catch (err) {
    const errorMsg = err.errors ? err.errors[0].message : err.message;
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ status: "error", msg: errorMsg });
    }
    
    
    };






	return {
        getMedication,
        getBrandmst
	};
};

module.exports = metMedicationController();