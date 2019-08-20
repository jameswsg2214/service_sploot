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
						petId: postData.petId,
						weightValue: postData.weightValue,
						weighDate: postData.weighDate,
						active: postData.active	
					},
					{
						where: {
							activityWeightId: postData.activityWeightId
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
				const Petdata = petWeightdb.create({
					petId: postData.petId,
					weightValue: postData.weightValue,
					weighDate: postData.weighDate,
					active: postData.active

				}, {
						returning: true
					}).then(data => {
						console.log(data)
						res.json({ status: "success", msg: "Inserted Successfully" })
					})
			}

		}
		catch (err) {
			console.log(err);
			res.json({ status: "error", msg: "Inserted Unsuccessfully" })
		};
	};







	return {
		postPetWeight,
	};
};

module.exports = weightController();