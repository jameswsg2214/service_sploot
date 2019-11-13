const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")
const CMSContent = db.TblCms;
const Appointment = db.TblAppointment;



const cmdDetailsController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

 const getCMSlist = async (req, res, next) => {
	const selectData = req.body;
    try {
      /* cms Data */
      const cms = await CMSContent.findAll({where: { category: selectData.category }});
      if (!cms) {
        return res
		  .status(httpStatus.OK)
		  .json({ status: false, data:cms, message:"Data's not found" });
      }
      return res
		.status(httpStatus.OK)
		.json({ status: true, data:cms, message:"Fetched successfully" });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
		.status(httpStatus.INTERNAL_SERVER_ERROR)
		.json({ status: false,message:errorMsg });
    }
  };

  const addAppointment = async (req, res, next) => {
	const appointmentData = req.body;
	console.log(appointmentData)
	if (appointmentData) {
		await Appointment.create(
			{
				userId: appointmentData.userId,
				petId: appointmentData.petId,
				task_name: appointmentData.task_name,
				start_date: appointmentData.start_date,
				end_date: appointmentData.end_date,
				repeat_type: appointmentData.repeat_type,
				frequency_type_id: appointmentData.frequency_type_id,
				every_frequency: appointmentData.every_frequency,
				selective_week: appointmentData.selective_week,
				active: appointmentData.active,
				cat_type: appointmentData.cat_type
			},
			{
				returning: true
			}).then(data => {
				console.log(data)
				res.send({ status:true,data:appointmentData, message: "Inserted Successfully"})
			}).catch(err => {
				res.send({ status:false, message: "failed to insert data", error: err })
			})
	}
	else {
		res.send({ status:false, message: 'Please enter appointment data' })
	}
};

  const addCMSdetails = async (req, res, next) => {
	const postData = req.body;
	if (postData) {
		await CMSContent.create(
			{
				heading: postData.heading,
				subheading: postData.subheading,
				category: postData.category,
				schedule: postData.schedule,
				tag: postData.tag,
				authordetails: postData.authordetails,
				content: postData.content,
				active:"1"
			},
			{
				returning: true
			}).then(data => {
				console.log(data)
				res.send({ status:true,data:data, message: "Inserted Successfully"})
			}).catch(err => {
				res.send({ status:false, message: "failed to insert data", error: err })
			})
	}
	else {
		res.send({ status:false, message: 'Please enter cms data' })
	}
};
const updateCMSdetails = async(req, res, next) => {
    const cmssData = req.body;
	try {
		if(cmssData.no) {
			const updateData = await CMSContent.update(cmssData, {
				returning: true,
				where: {
					no: cmssData.no
				  }
			});
			if (updateData && req.files && req.files.length > 0) {
				return res.status(httpStatus.OK).json({status:true ,message: 'updated Successfully'});
			}
		} else {
			return res.status(httpStatus.BAD_REQUEST).json({status:false ,message: 'No should be provided'});
		}
	} catch (err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status:false ,message: 'Internal server error' });
	}
};
//DELETE
const deleteCMSdetails = async (req, res, next) => {
	const { id } = req.body;

	try {
		var postData = req.body
		const cmsdelete = await CMSContent.update({
			active: "0",
		}, {
				where: {
					no: postData.id
				},
				returning: true,
				plain: true
			}).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({status:false, message: errorMsg });
			});
		return res.status(httpStatus.OK).json({
			status:true,message:"deleted successfully"
		});
	} catch (err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:false, message: "Internal server error" });
	}

};
const getCMSbyId = async (req, res, next) => {
	const { id } = req.body;
	if (id) {
		try {
			var postData = req.body;
			const contentmanagement = await CMSContent.findOne({
				where: {
					no: postData.id
				},
				returning: true,
				plain: true
			}).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ status:false ,message: errorMsg });
			});
			return res.status(httpStatus.OK).json({
				status:true,
				data:contentmanagement,
				message:"Fetched successfully"
			});
		} catch (err) {
			console.log(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:true, message: "Internal server error" });
		}
	}
};
  // --------------------------------------------return----------------------------------
  return {
	getCMSlist,
	addCMSdetails,
	addAppointment,
	updateCMSdetails,
	deleteCMSdetails,
	getCMSbyId
  };
};


module.exports = cmdDetailsController();