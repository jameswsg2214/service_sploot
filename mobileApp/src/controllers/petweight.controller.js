const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");


const petWeightdb = db.TblActivityWeight;

const weightController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

	//Compiring Previous Pet Weight And Current Pet By ueing Date

	const getweightByDate = async (req, res, next) => {

		const postData = req.body;

		console.log("=============>Get weghtid", postData)

		try {
			const met = await petWeightdb.findAll({
			});
			console.log(met)
			var responseArray = [];
			var responseData = [];
			if (!met) {
				return res
					.status(httpStatus.OK)
					.json({ status: "error", msg: "Weight Date's not found" });
			}
			else {
				var todayDate = new Date();
				var tdate = todayDate.toJSON().slice(0, 10);
				var nDate = tdate.slice(0, 4) + '-' + tdate.slice(5, 7) + '-' + tdate.slice(8, 10)
				console.log("Today--------------------------------------------------------------->>>>>>>>>>>>>>>", nDate)
				for (let i = 0; i < met.length; i++) {
					var date = met[i].weighDate;
					if (date <= postData.weighDate) {
						responseArray.push(met[i]);
					}
				}
				if (responseArray.length > 0) {

					responseArray.sort(function (a, b) {
						return new Date(b.weighDate) - new Date(a.weighDate);
					});
					responseData.push(responseArray[0]);
					responseData.push(responseArray[1]);
					res.send({ status: 'success', req: postData, res: responseData });
				} else {
					return res.status(404).json({ Error: "No Records Found" });
				}
			}

		}
		catch (err) {
			const errorMsg = err.errors ? err.errors[0].message : err.message;
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ status: "error", msg: errorMsg });
		}

	}

	const postPetWeight = async (req, res, next) => {

		try {

			const postData = req.body;

			var flag = 'insert';
			if (postData.activityWeightId != undefined) {

				console.log("activityWeightId")
				const findPet = await petWeightdb.findAll(
					{
						where: { activityWeightId: postData.activityWeightId }
					});
				if (findPet.length > 0) {
					flag = 'update';
				}
			}

			if (flag == 'update') {
				//update
				console.log("findPet==========>")
				petWeightdb.update(
					{

						userId: postData.active,
						petId: postData.petId,
						weightValue: postData.weightValue,
						weighDate: postData.weighDate,
						active: postData.active,
					},
					{
						where: {
							activityWeightId: postData.activityWeightId
						}
					}
				)
					.then(() => {
						return res.status(httpStatus.OK).json({
							status: "success", msg: "Updated Successfully", req: postData
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
				const Petdata = petWeightdb.create({

					userId: postData.active,
					petId: postData.petId,
					weightValue: postData.weightValue,
					weighDate: postData.weighDate,
					active: postData.active,


				}, {
						returning: true
					})
					.then(data => {
						console.log(data)
						res.json({ status: "success", msg: "Inserted Successfully", req: postData })
					})
			}

		}
		catch (err) {
			console.log(err);
			res.json({ status: "error", msg: "Inserted Unsuccessfully" })
		};
	};



	const deletepetweight = async (req, res, next) => {
		const postData = req.body
		try {
			console.log(req.body)
			const data = await petWeightdb.update(
				{ active: '0' },
				{
					where: {
						activityWeightId: req.body.activityWeightId
					}
				}
			)
			if (!data) {
				return res
					.status(httpStatus.OK)
					.json({ status: "error", msg: "petweight Data's not found" });
			}
			return res
				.status(httpStatus.OK)
				.json({ status: "success", req: postData, WeightData: data });
		} catch (err) {
			const errorMsg = err.errors ? err.errors[0].message : err.message;
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ status: "error", msg: errorMsg });
		}
	};

	const petWeightBulk = async (req, res, next) => {
		const petWeightlist = req.body;
		if (petWeightlist.length > 0) {
			try {
				var _petWeightlist = [];
				petWeightlist.forEach(function (arrayItem) {
					const obj = {
						userId: arrayItem.userId,
						petId: arrayItem.petId,
						status: arrayItem.status,
						weightValue: arrayItem.weightValue,
						weighDate: arrayItem.weighDate,
					}
					_petWeightlist.push(obj);
				})
				console.log("-----------------------------__>>>>>>>>>>>>>>>>>petWeightlist", _petWeightlist)
				const petWeightdbImport = await petWeightdb.bulkCreate(
					_petWeightlist,
					{
						fields: ["userId", "petId", "status", "weightValue", "weighDate", ""],
						updateOnDuplicate: ["weightValue"],
					},
					{
						returning: true
					})
				return res.status(httpStatus.OK).json({ req: petWeightlist, RES: petWeightdbImport });
			}
			catch (err) {
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
			}
		}
	};
	//bulk completed


	return {
		postPetWeight,
		deletepetweight,
		getweightByDate,
		petWeightBulk

	};
};

module.exports = weightController();