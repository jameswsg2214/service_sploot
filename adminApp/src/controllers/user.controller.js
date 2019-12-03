const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
var nodemailer = require("nodemailer");
const bcryptService = require("../services/bcrypt.service");
var otplib = require('otplib')
const User = db.TblUser;
const UserOtp = db.TblUserOtp;
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
		console.log('===============>>>' + req.body)
		const postData = req.body;
		postData.verified = 0
		if (postData) {
			try {
					await User.create(postData)
						.then(async (data)=>{
								return res.status(httpStatus.OK).json({
									message: "user added successfully"
								});
						})
						.catch(err => {
							 const errorMsg = err.errors ? err.errors[0].message : err.message;
							return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
						});
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
