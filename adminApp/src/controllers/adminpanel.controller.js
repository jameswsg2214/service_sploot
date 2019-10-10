const httpStatus = require("http-status");
const _ = require("lodash");
const moment = require("moment");
var Sequelize = require('sequelize');
const db = require("../config/sequelize");
const UploadHelper = require("../helpers/UploadHelper");

const Content = db.TblCms;

const adminpanelController = () => {

	const getTable = async (req, res, next) => {
		try {
			const cmsdata = await db.sequelize.query('select * from TblCms', { raw: true }
			).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			console.log(cmsdata)
			return res.status(httpStatus.OK).json({
				cmsdata
			});
		} catch (err) {
			console.log(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
		}
    };

    const createTable = async (req, res, next) => {
	try {
		const cmsCreate = await Content.create({
			no: req.body.no,
			heading: req.body.heading,
			date:new Date(),
		},{ returning: true}
		).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			return res.status(httpStatus.OK).json({
                cmsCreate
				});
	} catch (err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
	}
};
    

const updateTable = async(req, res, next) => {
    const cmssData = req.body;
    console.log("sssssssssss");
	try {
		if(checkData.no) {
			const updateData = await Content.update(checkData, {
				returning: true,
				where: {
					no: cmssData.no
				  }
			});
			if (updateData && req.files && req.files.length > 0) {
				return res.status(httpStatus.OK).json();
			}
			return res.status(httpStatus.OK).json({msg: 'updated Successfully'});
		} else {
			return res.status(httpStatus.BAD_REQUEST).json({msg: 'No should be provided'});
		}
	} catch (err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
	}
};


const addContent = async (req, res, next) => {
	// console.log("add checklist entered"+req.body);
	const details = req.body;
					const cmssCreate = await Content.create({
						no: details.id,
						heading: details.heading,
                        date:new Date(),
					},
						{
							returning: true
						});
					if (cmssCreate) {
						return res.status(httpStatus.OK).json({
							status: "success",
							msg: "Content created successfully",
							data : cmssCreate
						});
					}
	};

//VIEW 
const getTableaction = async (req, res, next) => {
	const { id } = req.body;
	if (id) {
		try {
			var postData = req.body;
			const contentmanagement = await Content.findOne({
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



//DELETE
const deleteTable = async (req, res, next) => {
	const { id } = req.body;

	try {
		var postData = req.body
		const cmsUpdate = await Check.update({
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




	return {
	
		getTable,
		createTable,
		updateTable ,
		addContent,
		getTableaction ,
		deleteTable,
		

 	};
};
module.exports = adminpanelController();