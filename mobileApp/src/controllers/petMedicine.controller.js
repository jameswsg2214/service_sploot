const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");


const medicinedb = db.TblActivityMedicine;

const medicineController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
    const postMedicine = async(req, res, next) => {
    
            try{
                const postData = req.body;

                var flag = 'insert';
                if (postData.activityMedicineId != undefined){
                console.log("activityMedicineId")
                const findMedicine = await medicinedb.findAll(
                    {
                        where : {activityMedicineId : postData.activityMedicineId}
                    });
                    if(findMedicine.length > 0){
                        flag = 'update';
                    }
                }
                if(flag == 'update') {
                //update
                medicinedb.update(
                    {
                        userId : postData.userId,
                        petId : postData.petId,
                        medicineTypeId : postData.medicineTypeId,
                        medicineName : postData.medicineName,
                        foodWeight : postData.foodWeight,
                        foodDate : postData.foodDate,
                        active : postData.active
                    },

                    {
                        where : {activityMedicineId : postData.activityMedicineId}

                    }
                )

                .then(()=>{
                    return res.status(httpStatus.OK).json({
                        status : "sucess" , msg : "updated sucessfully"
                    });
                })
                .catch(()=>{
                    return res.status(httpStatus.ok).json({
                        status : "error" , msg : "updatation failed"
                    });
                })
            }

        else{
            console.log("undefined")
            const petMedicine = medicinedb.create({
                   userId : postData.userId,
                        petId : postData.petId,
                        medicineTypeId : postData.medicineTypeId,
                        medicineName : postData.medicineName,
                        foodWeight : postData.foodWeight,
                        foodDate : postData.foodDate,
                        active : postData.active
            },

            {
                return : true

            })
        .then(data=>{
            console.log(data)
            res.json({status: 'success' , msg : 'inserted sucessfully'})
        })

        }



        }

        catch (err){
        console,log(err);
        res.json({status : "error" , msg : "inserted unsuccessfull "})
        }

    };

    const deleteMedicine = async(req,res,next) => {
        try{
    console.log(req.body)
    const data = await medicinedb.update(
        {active:'0'},
        {
            where : {activityMedicineId : req.body.activityMedicineId}
        }
    )

    if(!data){
        return res 
        .status(httpStatus.OK)
        .json({status:"error" , msg : "petmedicine is not found"})
    }
    return res 
    .status(httpStatus.OK)
    .json({status : "sucess" , medicinedata : data});
        }
        catch (err) {
			const errorMsg = err.errors ? err.errors[0].message : err.message;
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ status: "error", msg: errorMsg });
		}
    };


      	const petMedicineBulk = async (req, res, next) => {
		const petMedicinelist = req.body;
		if (petMedicinelist.length > 0) {
			try {
				var _petMedicinelist = [];
				petMedicinelist.forEach(function (arrayItem) {
					const obj = {
						userId: arrayItem.userId,
                        petId: arrayItem.petId,
                        medicineTypeId : arrayItem.medicineTypeId,
                        medicineName : arrayItem.medicineName,
                        foodWeight: arrayItem.foodWeight,
                        foodDate: arrayItem.foodDate,
                        status: arrayItem.status,

					}
					_petMedicinelist.push(obj);
				})
				console.log("-----------------------------__>>>>>>>>>>>>>>>>>petWeightlist", _petMedicinelist)
				const medicinedbImport = await medicinedb.bulkCreate(
					_petMedicinelist,
					{
                        fields: ["userId", "petId", "","medicineTypeId", "medicineName",  "foodWeight" ,"foodDate","status" ,""],
						updateOnDuplicate: ["medicineName"],
					},
					{
						returning: true
					})
				return res.status(httpStatus.OK).json({ medicinedbImport });
			}
			catch (err) {
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
			}
		}
	};  


    return {
        postMedicine,
        deleteMedicine,
        petMedicineBulk
        
    };

};

module.exports = medicineController();