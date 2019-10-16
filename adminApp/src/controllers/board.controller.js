const httpStatus = require("http-status");
const _ = require("lodash");
const moment = require("moment");
var Sequelize = require('sequelize');
const db = require("../config/sequelize");
//const UploadHelper = require("../helpers/UploadHelper");

const Check = db.TblUser;

const addadmincategoryController = () => {

	const getCategoryy = async (req, res, next) => {
		try {
			const sfabranch = await db.sequelize.query('select * from TblUser', { raw: true }
			).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			console.log(sfabranch)
			return res.status(httpStatus.OK).json({
				sfabranch
			});
		} catch (err) {
			console.log(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
		}
    };


	const getDashBoardSummary = async (req, res, next) => {
		try {
            const  summaryData={
				"TotalRegisteredUsercount":[
					{"no": 100, "month": "Jan"},
					{"no": 100, "month": "Feb"},
					{"no": 100, "month": "Mar"},
					{"no": 100, "month": "Apr"},
					{"no": 100, "month": "May"},
					{"no": 100, "month": "Jun"},
					{"no": 100, "month": "July"},
					{"no": 100, "month": "Aug"},
					{"no": 100, "month": "Sep"},
					{"no": 100, "month": "Oct"},
					{"no": 100, "month": "Nov"},
					{"no": 100, "month": "Dec"}
				],
				"TotalNewRegisteredUsercount":
				[
					{"no": 100, "month": "Jan"},
					{"no": 100, "month": "Feb"},
					{"no": 100, "month": "Mar"},
					{"no": 100, "month": "Apr"},
					{"no": 100, "month": "May"},
					{"no": 100, "month": "Jun"},
					{"no": 100, "month": "July"},
					{"no": 100, "month": "Aug"},
					{"no": 100, "month": "Sep"},
					{"no": 100, "month": "Oct"},
					{"no": 100, "month": "Nov"},
					{"no": 100, "month": "Dec"}
				],
				"TotalRegisteredDogscount":
				[
					{"no": 100, "month": "Jan"},
					{"no": 100, "month": "Feb"},
					{"no": 100, "month": "Mar"},
					{"no": 100, "month": "Apr"},
					{"no": 100, "month": "May"},
					{"no": 100, "month": "Jun"},
					{"no": 100, "month": "July"},
					{"no": 100, "month": "Aug"},
					{"no": 100, "month": "Sep"},
					{"no": 100, "month": "Oct"},
					{"no": 100, "month": "Nov"},
					{"no": 100, "month": "Dec"}
				],
				"TotalAchivcount":300,
				"TotalPatescount":450,
				"TotalCMScount":400
			};
			return res.status(httpStatus.OK)
			.json({ status: true, data:summaryData, message:"success" });
		} catch (err) {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
		}
    };

	return {
	
		getCategoryy,
		getDashBoardSummary,
	
 	};
};
module.exports = addadmincategoryController();