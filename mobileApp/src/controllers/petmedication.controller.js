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
	const getMedication  = async (req, res, next) => {
        const postData = req.body; 
        console.log("=============>Get medication",postData)

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
                .json({ status: "success", petcategorydetails: met });
            } 
            catch (err) {
              const errorMsg = err.errors ? err.errors[0].message : err.message;
              return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: "error", msg: errorMsg });
            }
	
  };

  
  ////post medication///////////////////

  const postMedication = async(req, res, next)=>{
  
   console.log("===================>>>>>>>>>>>>>>>post medication")
		try {
      // const medData = req.body;
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
          Age: medData.Age,
          dose: medData.dose,
					},
					{
						where: {
							medicationId: medData.medicationId
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
				console.log("undefined")
				const metdata = Medicationdb.create({
					medicationId: medData.medicationId,
					petCategoryId: medData.petCategoryId,
					brandId: medData.brandId,
          drugName: medData.drugName,
          drugType: medData.drugType,
          route: medData.route,
          Age: medData.Age,
          dose: medData.dose,
				}, {
						returning: true
					})
					.then(data => {
						console.log(data)
						res.json({ status: "success", msg: "Inserted Successfully" })
					})
			}

		}
		catch (err) {
			console.log(err);
			res.json({ status: "error", msg: "Inserted Unsuccessfully" })
		};


  }




  

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


    const petMasterBulk = async (req, res, next) => {
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
      photo: arrayItem.photo
      }
      _petMasterlist.push(obj);
      })
      console.log("-----------------------------__>>>>>>>>>>>>>>>>>_petMasterlist",_petMasterlist)
      const petMasterImport = await PetMaster.bulkCreate(
      _petMasterlist,
      {
      fields: ["petName","breedId","petCategoryId","photo","status","sex","monthlyCycle","dob","period","height","length","weight","color","marks","parentFatherName","parentFatherBreedName","parentAddress","parenOwnerName","parenMobileNumber","parentOwnerAddress","drName","drhospitalName",""],
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





	return {
        getMedication,
        postMedication,
        getBrandmst
	};
};

module.exports = metMedicationController();