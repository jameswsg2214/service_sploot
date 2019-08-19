const httpStatus = require("http-status");
const db = require("../config/sequelize");
const authService = require("../services/auth.service");
const _ = require("lodash");
var nodemailer = require("nodemailer");
const bcryptService = require("../services/bcrypt.service");
var otplib = require('otplib')
const User = db.TblUser;
const UserOtp = db.TblUserOtp
var xoauth2 = require('xoauth2');

const UserController = () => {
	/** 
	 * Create new user here i need to do g authentication
	 * @property {string} req.body - user object.
	 * 
	 */

	const createUser = async (req, res, next) => {
		const userData = req.body;
		if (userData) {
			try {
				const user = await User.findOne({
					where: {
						email: userData.email
					}
				}).catch(err => {
					const errorMsg = err.errors ? err.errors[0].message : err.message;
					return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
				});
				if (user) {
					return res.send({ status: "failed", msg: "User Name already Exist" });
				} else {
					try {
						const verified = UserOtp.findOne({
							where: {
								email: userData.email,
								verified: 1
							}
						})
							.then((data) => {
								if (data == null) {
									res.send({ status: 'failed', msg: 'Email is not verified' })
								} else {
									const postData = req.body;
									console.log('postdata', postData)
									User.create({
										password: postData.password,
										email: postData.email,
										userTypeId: 1
									}, {
											returning: true
										})
										.then((data) => {
											console.log('data=============>>>>>>', data)
											const token = authService().issue({ id: data.dataValues.userId });
											console.log('token==========>>>', token)
											res.send({ status: "success", msg: "User registered successfully", token: token, data: data })
										})
										.catch(err => {
											const errorMsg = err.errors ? err.errors[0].message : err.message;
											return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
										});
								}
							})

					} catch (err) {
						return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
					}
				}
			} catch (err) {
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
			}
		}
	};

	const verifyOtp = async (req, res, next) => {
		const verifyData = req.body
		console.log(verifyData)
		const user = await User.findOne({
			where: { email: verifyData.email }
		}, function (err, data) {
			res.json(data)
		}).catch(err => {
			const errorMsg = err.errors ? err.errors[0].message : err.message;
			return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
		});
		console.log('--------user', user);
		if (user.dataValues.verified === 0) {
			User.update(
				{ verified: 1 },
				{
					where: {
						email: verifyData.email
					}
				}
			)
				.then(() => {
					return res.status(httpStatus.OK).json({
						msg: "OTP verified successfully"
					});
				})
				.catch(() => {
					return res.status(httpStatus.OK).json({
						msg: "Failed to verify OTP"
					});
				})
		} else {
			return res.status(httpStatus.OK).json({
				msg: "OTP is already verified"
			});
		}
	};

	const signupUser = async (req, res, next) => {
		const profileData = req.body;
		if (profileData) {
			const user = await User.findOne({
				where: {
					email: profileData.email
				}
			}).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			console.log("============>>>>>>>>>>.", user)
			if (user) {
				res.send({ status: 'failed', msg: "Email already registered" });
			} else {
				User.create({
					userName: profileData.userName,
					email: profileData.email,
					password: profileData.userId,
					userTypeId: 1
				}, {
						returning: true
					})
					.then((data) => {
						const token = authService().issue({ id: data.dataValues.userId });
						res.send({ status: 'success', token: token, msg: "Successfully registered", data: data });
					})
					.catch((err) => {
						res.send({ status: 'failed', msg: "Failed to register" , err: err });
					})
			}
		}
	}

	return {
		createUser,
		verifyOtp,
		signupUser
	};
};
module.exports = UserController();
