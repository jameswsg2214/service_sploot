const httpStatus = require("http-status");
const _ = require("lodash");
const moment = require("moment");
var Sequelize = require('sequelize');
const db = require("../config/sequelize");
//const UploadHelper = require("../helpers/UploadHelper");

const User = db.TblUser;
const Pets = db.TblPetMaster;

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
			const AllUsers = await User.count(
			).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			const activeuserscount = await User.count({ where: { active: '1' }}
				).catch(err => {
					const errorMsg = err.errors ? err.errors[0].message : err.message;
					return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
				});
				const inactiveUsers = await User.count({ where: { active: '0' }}
				).catch(err => {
					const errorMsg = err.errors ? err.errors[0].message : err.message;
					return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
				});	

				const Allpets = await Pets.count(
					).catch(err => {
						const errorMsg = err.errors ? err.errors[0].message : err.message;
						return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
					});

			const alldogs = await Pets.count({ where: { petCategoryId: '1' }}
				).catch(err => {
					const errorMsg = err.errors ? err.errors[0].message : err.message;
					return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
				});
				const allcats = await Pets.count({ where: { petCategoryId: '2' }}
				).catch(err => {
					const errorMsg = err.errors ? err.errors[0].message : err.message;
					return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
				});
				
				const summaryData={
				
						"TotalRegisteredUsercount":[
							{"no": 56, "month": "Jan"},
							{"no": 18, "month": "Feb"},
							{"no": 14, "month": "Mar"},
							{"no": 37, "month": "Apr"},
							{"no": 16, "month": "May"},
							{"no": 100, "month": "Jun"},
							{"no": 65, "month": "July"},
							{"no": 10, "month": "Aug"},
							{"no": 76, "month": "Sep"},
							{"no": 23, "month": "Oct"},
							{"no": 56, "month": "Nov"},
							{"no": 10, "month": "Dec"}
						],
						"TotalNewRegisteredUsercount":
						[
							{"no": 10, "month": "Jan"},
							{"no": 56, "month": "Feb"},
							{"no": 24, "month": "Mar"},
							{"no": 51, "month": "Apr"},
							{"no": 46, "month": "May"},
							{"no": 87, "month": "Jun"},
							{"no": 21, "month": "July"},
							{"no": 89, "month": "Aug"},
							{"no": 15, "month": "Sep"},
							{"no": 90, "month": "Oct"},
							{"no": 0, "month": "Nov"},
							{"no": 13, "month": "Dec"}
						],
						"TotalRegisteredDogscount":
						[
							{"no": 10, "month": "Jan"},
							{"no": 20, "month": "Feb"},
							{"no": 78, "month": "Mar"},
							{"no": 43, "month": "Apr"},
							{"no": 10, "month": "May"},
							{"no": 14, "month": "Jun"},
							{"no": 100, "month": "July"},
							{"no": 56, "month": "Aug"},
							{"no": 40, "month": "Sep"},
							{"no": 12, "month": "Oct"},
							{"no": 96, "month": "Nov"},
							{"no": 10, "month": "Dec"}
						],
						TotalRegisteredUsercount:AllUsers,
						TotalNewRegisteredUsercount:activeuserscount,
						InactiveUsers:inactiveUsers,
						TotalPets: Allpets,
						Dogs:alldogs,
						Cats:allcats
					};
			return res.status(httpStatus.OK)
			.json({ status: true,data:summaryData,message:"success" });
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