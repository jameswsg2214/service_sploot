const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")
const CMSContent = db.TblCms;



const cmdDetailsController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

  const getCMSlist = async (req, res, next) => {
    try {
      /* cms Data */
      const cms = await CMSContent.findAll({
      });
      if (!cms) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", msg: "Fetched successfully", req: '', res: cms });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };
  const addCMSdetails = async (req, res, next) => {
	const postData = req.body;
	if (postData) {
		await CMSContent.create(
			{
				no: postData.id,
				heading: postData.heading,
				subheading: postData.subheading,
				category: postData.category,
				schedule: postData.schedule,
				tag: postData.tag,
				authordetails: postData.authordetails,
				content: postData.content,
				titleImage: postData.titleImage,
				active:"1"
			},
			{
				returning: true
			}).then(data => {
				console.log(data)
				res.send({ status: "success", msg: "Inserted Successfully", req: postData, res: data })
			}).catch(err => {
				res.send({ status: "failed", msg: "failed to insert data", error: err })
			})
	}
	else {
		res.send({ status: 'failed', msg: 'Please enter cms data' })
	}
};
const updateCMSdetails = async(req, res, next) => {
	const cmssData = req.body;
	try {
		const updateData = await CMSContent.update({
		}, {
				where: {
					no: cmssData.no
				},
				returning: true,
				plain: true
			}).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			return res.status(httpStatus.OK).json({
				msg: 'updated Successfully', Data : updateData
			});
	} catch (err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
	}

	// console.log('This is data'+ cmssData)
	// try {
	// 	if(cmssData) {
	// 		const updateData = await CMSContent.update({
	// 			returning: true,
	// 			where: {
	// 				no: cmssData.no
	// 			  }
	// 		}).catch(err => {
	// 			const errorMsg = err.errors ? err.errors[0].message : err.message;
	// 			return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
	// 		});
	// 		break;
	// 		return res.status(httpStatus.OK).json({
	// 			msg: 'updated Successfully', Data : updateData
	// 		});
	// 	} else {
	// 		console.log('2')
	// 		return res.status(httpStatus.BAD_REQUEST).json({msg: 'No should be provided'});
	// 	}
	// } catch (err) {
	// 	console.log('1')
	// 	console.log(err);
	// 	return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
	// }
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
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
		return res.status(httpStatus.OK).json({
			status: "success", msg: "deleted"
		});
	} catch (err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
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
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			return res.status(httpStatus.OK).json({
				contentmanagement
			});
		} catch (err) {
			console.log(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
		}
	}
};
  // --------------------------------------------return----------------------------------
  return {
	getCMSlist,
	addCMSdetails,
	updateCMSdetails,
	deleteCMSdetails,
	getCMSbyId
  };
};


module.exports = cmdDetailsController();