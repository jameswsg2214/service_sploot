const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
var nodemailer = require("nodemailer");
const bcryptService = require("../services/bcrypt.service");
var otplib = require('otplib')
const User = db.TblUser;
const UserOtp = db.TblUserOtp
var xoauth2 = require('xoauth2');

const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
const token = otplib.authenticator.generate(secret);

//const otp = otpGenerator.generate(6, { digits : true,upperCase: false, specialChars: false, upperCase: false, specialChars: false });

var smtpTransport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "chandubhimapalli4@gmail.com",
		pass: "cH@14421"
	}
});

var rand, mailOptions, host, link;
const UserController = () => {
	/** 
	 * Create new user here i need to do g authentication
	 * @property {string} req.body - user object.
	 * 
	 */
	
	const createUser = async (req, res, next) => {

		const { userName } = req.body;
		if (userName) {
			try {
				const user = await User.findOne({ //this is working
					where: {
						userName: userName
					}
				}).catch(err => {
					const errorMsg = err.errors ? err.errors[0].message : err.message;
					return res.status(httpStatus.BAD_REQUEST).json({ message: errorMsg });
				});
				 console.log(user)
				if (user) {
					return res.status(httpStatus.BAD_REQUEST).json({ message: "User Name already Exist" });
				} else {
					try {
						const postData = req.body;
					     console.log('postdata', postData)
						const data = await User.create({
							userName: postData.userName,
							password: postData.password,
							email: postData.email,
							verified: 0,
						}, {
								returning: true
							})
							.then(async (data)=>{
								if (data) {
									if (isNaN(data.email)) {
										console.log("-------------->",data.email);
										
										//email
										// setup e-mail data with unicode symbols
										var userId = await User.findOne({
											where:{email: data.email}
										}, (err, data) => {
											return data
										});
		
										var mailOptions = {
											from: "chandubhimapalli4@gmail.com", // sender address
											to: data.email, // list of receivers
											subject: "Hello ✔", // Subject line
											text: token, // plaintext body
											html: `<b>Your OTP is ${token}</b>` // html body
										}
		
										// send mail with defined transport object
										await smtpTransport.sendMail(mailOptions, function (error, response) {
											if (error) {
												 console.log(error);
											} else {						
												const userOtp = UserOtp.create({
													userId: userId.dataValues.userId,
													email: data.email,
													otp: token
												}, {
														returning: true
													})
													.catch(err => {
														const errorMsg = err.errors ? err.errors[0].message : err.message;
														return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
													});
											}
		
										});
									} else {
										console.log('error')
									}
									return res.status(httpStatus.OK).json({
										message: "OTP sent successfully"
									});
								}
							})
							.catch(err => {
								 const errorMsg = err.errors ? err.errors[0].message : err.message;
								return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
							});

						
					} catch (err) {
						return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
					}
				}
			} catch (err) {
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
			}
		}
	};

	const verifyOtp = async (req, res) => {
		const verifyData = req.body
		const user = await UserOtp.findOne({
			where:{email: verifyData.email}
		},function(err,data){
			res.json(data)
		}).catch(err => {
			const errorMsg = err.errors ? err.errors[0].message : err.message;
			return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
		});
		console.log('--------user',user);
		
		if(user){
			User.update(
				{ verified: 1 },
				{
					where: {
						email: verifyData.email
					}
				}
			);
		}
	}
	return {
		createUser,
		verifyOtp
	};
};
module.exports = UserController();
