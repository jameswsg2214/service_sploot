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

// var smtpTransport1 = require('nodemailer-smtp-transport');

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
				//	const errorMsg = err.errors ? err.errors[0].message : err.message;
					return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
				});
				// console.log(user)
				if (user) {
					return res.status(httpStatus.BAD_REQUEST).json({ msg: "User Name already Exist" });
				} else {
					try {
						const postData = req.body;
						// console.log('postdata', postData)
						const userCreate = await User.create({
							userName: postData.userName,
							password: postData.password,
							userType: postData.userType,
							phoneNo: postData.phoneNo,
							email: postData.email,
							active: postData.active,
							verified: 0,
							modifiedBy: 'admin'
						}, {
								returning: true
							})
							.catch(err => {
								// const errorMsg = err.errors ? err.errors[0].message : err.message;
								return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
							});

						if (userCreate) {
							console.log("usercreate=================>",userCreate.email);
							
							if (isNaN(userCreate.email)) {
								//email
								// setup e-mail data with unicode symbols
								//var userId = db.sequelize.query("SELECT userId FROM TblUser WHERE email="+"'"+userCreate.email+"'")
								var userId = await User.findOne({
									email: userCreate.email
								}, (err, data) => {
									 console.log('---------------------------------------->', data)
									return data
								});


								var mailOptions = {
									from: "chandubhimapalli4@gmail.com", // sender address
									to: userCreate.email, // list of receivers
									subject: "Hello ✔", // Subject line
									text: token, // plaintext body
									html: `<b>Your OTP is ${token}</b>` // html body
								}

								// send mail with defined transport object
								await smtpTransport.sendMail(mailOptions, function (error, response) {
									if (error) {
										 console.log('------------------>sdfsdfa', error);
									} else {
										// console.log("Message sent: " + JSON.stringify(response), token);
										console.log('---------->inside',userId)
										
										
										const userOtp = UserOtp.create({
											userId: userId.userId,
											email: userCreate.email,
											otp: token
										}, {
												returning: true
											})
											.catch(err => {
											//	const errorMsg = err.errors ? err.errors[0].message : err.message;
												return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
											});
									}

								});
							} else {
								console.log('------------>err')
							}
							return res.status(httpStatus.OK).json({
								msg: "OTP sent successfully"
							});
						}
					} catch (err) {
						console.log('----------->1st')
						return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
					}
				}
			} catch (err) {
				console.log('-------------->2nd')
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
			}
		}
	};

	// const verifyOtp = async (req, res, next) => {
	// 	console.log('warsetfghjklhytredaffgugh')
	// 	const verifyData = req.body
	// 	const email = 'dsfsdasydds@gmail.com'
	// 	//with email we need to fetch userId from user table
	// 	//with this userId need to fetch otp from otp table
	// 	//veririfed then otp verify status 1
	// 	User.findOne({
	// 		email: email
	// 	},function(err,data){
	// 		res.json(data)
	// 	})
	// // 	.then(data => res.json(data))
    // //    .catch(err => res.status(404).json({ success: false }));
	// 	// .then((data) => {
	// 	// 	if (data && data.length) {
	// 	// 		console.log('verified')

	// 	// 	} else {
	// 	// 		console.log('not verified')
	// 	// 	}
	// 	// })
	// }

	

	const verifyOtp = async (req, res) => {
		// console.log('warsetfghjklhytredaffgugh')
		const verifyData = req.body
		const email = 'chandubhimapalli4@gmail.com'
        console.log('ffffffff-----',verifyData)
		// User.findOne({
		// 	email: email
		// },function(err,data){
		// 	res.json(data)
		// })
		// call avvat;eda  rey authentiacation rasa 
	    // const user = await User.findOne({ //this is working
		// 	where: {
		// 		email: verifyData.email
		// 	}
		// }).catch(err => {
		// //	const errorMsg = err.errors ? err.errors[0].message : err.message;
		// 	// return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
		// });
	    // console.log('ffff    out',user);
	}
	return {
		createUser,
		verifyOtp
	};
};
module.exports = UserController();
