const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const db = require("../config/sequelize");
var nodemailer = require("nodemailer");
const config = require("../config/config");
var otplib = require('otplib')
const User = db.TblUser;
const UserOtp = db.TblUserOtp
const otpAuth = db.TblOtpAuth;

var auth = require('otplib/authenticator')
const crypto = require('crypto')
auth.options = { crypto };

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sploot.oasys@gmail.com",
    pass: "sploot@123"
  }
});

const AuthController = () => {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */

  const login = async (req, res, next) => {

    const { email, password } = req.body;
    if (email && password) {
      console.log("if============>", email, password)
      try {
        const user = await User.findOne({
          where: { email: email }
        })
        if (user != null) {
          if (password === user.dataValues.password) {
            const token = authService().issue({ id: user.dataValues.userId });
            console.log(token)
            return res
              .status(httpStatus.OK)
              .json({ status: "success", token, User: user });
          } else {
            res.send({ status: 'failed', msg: 'password is incorrect' })
          }
        } else {
          res.send({ status: 'failed', msg: 'user not found' })
        }
      } catch (err) {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", msg: errorMsg });
      }
    }
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: "failed", msg: "Email or password is wrong" });
  };

  const userLogin = async (req, res, next) => {
    const profileData = req.body;
    if (profileData) {
      const user = await User.findOne({
        where: {
          email: profileData.email,
        }
      })
        .catch((error) => {
          res.send({ error: error })
        })
      console.log("==============>>>>>>>>>>>", user)
      if (user != null) {
        if (user.dataValues.password == profileData.userId) {
          const token = authService().issue({ id: user.dataValues.password });
          return res.send({ status: "success", msg: 'Login successfull', token: token, User: user });
        } else {
          res.send({ status: 'Failed', msg: 'userId is wrong' })
        }
      } else {
        res.send({ status: 'Failed', msg: 'User not found' })
      }

    }
  }

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

  const sendOtp = async (req, res, next) => {
    const { email } = req.body;
    var date = new Date()
    const secret = JSON.stringify(await date.getMilliseconds())
    const otp = auth.generate(secret);
    if (email) {
      try {
        const user = await UserOtp.findOne({
          where: {
            email: email
          }
        }).catch(err => {
          const errorMsg = err.errors ? err.errors[0].message : err.message;
          return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
        });
        console.log('------------>>>>', user)
        if (user) {
          var mailOptions = {
            from: "sploot.oasys@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Sploot ", // Subject line
            text: otp, // plaintext body
            html: `<b>Your OTP is ${otp}</b>` // html body
          }
          await smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
            } else {
              const userOtp = UserOtp.update(
                { otp: otp },
                {
                  where: {
                    email: email
                  }
                }, {
                  returning: true
                })
                .then((data) => {
                  console.log(data)
                  res.send({ status: 'success', msg: "OTP resend successfully" })
                })
                .catch(err => {
                  const errorMsg = err.errors ? err.errors[0].message : err.message;
                  return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
                });
            }
          });
        } else {
          try {
            const postData = req.body;
            console.log('postdata', postData)
            var mailOptions = {
              from: "sploot.oasys@gmail.com", // sender address
              to: email, // list of receivers
              subject: "Sploot ", // Subject line
              text: otp, // plaintext body
              html: `<b>Your OTP is ${otp}</b>` // html body
            }
            // send mail with defined transport object
            await smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
              } else {
                const userOtp = UserOtp.create({
                  email: email,
                  otp: otp
                }, {
                    returning: true
                  })
                  .then((data) => {
                    console.log(data)
                    return res.send({ status: 'success', msg: "OTP sent successfully" })
                  })
                  .catch(err => {
                    const errorMsg = err.errors ? err.errors[0].message : err.message;
                    return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
                  });
              }
            });
          }
          catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal servers error" });
          }
        }
      } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal serverfsd1 error" });
      }
    }
  };

  const generateOTP = async () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const forgetPassword = async (req, res, next) => {
    var username = req.body.username;
    let userTypeCondition = {};
    userTypeCondition.userTypeId = 2;
    userTypeCondition.active = "1";

    if (username) {
      if (isNaN(username)) {
        userTypeCondition.email = username;
      } else {
        userTypeCondition.phoneNo = username;
      }

      const user = await User.findOne({
        where: userTypeCondition,
        returning: true
      });
      let value = await generateOTP();
      let otpDetails = {};
      otpDetails = {
        userName: username,
        userId: user.userId,
        expireValue: "30000",
        otpValue: value
      };
      const otpCreate = await otpAuth.create(otpDetails, {
        returning: true
      });
      if (user) {
        let smtpTransport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "sfatroondx@gmail.com", // generated ethereal user
            pass: "troon@123" // generated ethereal password
          }
        });
        smtpTransport.verify(function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("Server is ready to take our messages");
          }
        });
        var mailOptions = {
          to: username,
          from: '"SFA" <sfatroondx@gmail.com>',
          subject: "SFA - Forgot Password:",
          text:
            "Hello SFA," +
            "\n\n" +
            "you have OTP Password is " +
            value +
            " Use this password OTP while login"
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          console.log("err", err);
          if (err) {
            console.log(err);
          } else {
            return res.status(httpStatus.OK).json({
              status: "success",
              msg: otpCreate
            });
          }
        });
      } else {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "User not found" });
      }
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: "error", msg: "Username is missing." });
    }
  };

  const validateOtp = async (req, res, next) => {
    const { otpValue } = req.body;
    let otpCond = {};

    if (otpValue) {
      otpCond.active = "1";
      otpCond.otpValue = otpValue;
      try {
        const otpValues = await otpAuth.findOne({
          where: otpCond
        });
        if (!otpValues) {
          return res
            .status(httpStatus.OK)
            .json({ status: "error", msg: "Otp not found" });
        }

        otpAuth.update(
          { active: "0" },
          {
            where: { otpValue: otpValue },
            returning: true
          }
        );
        return res
          .status(httpStatus.OK)
          .json({ status: "success", msg: "Successfully updated." });
      } catch (err) {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", msg: errorMsg });
      }
    }

    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: "error", msg: "OtpValue missing." });
  };

  const passwordChange = async (req, res, next) => {
    const { userId, password } = req.body;
    if (userId && password) {
      try {
        var passwrd = bcryptService().updatePassword(password);
        User.update(
          { password: passwrd, updatedAt: new Date() },
          {
            where: {
              userId: userId
            }
          }
        );
        return res
          .status(httpStatus.OK)
          .json({ status: "success", msg: "Successfully updated." });
      } catch (err) {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", msg: errorMsg });
      }
    }

    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: "error", msg: "UserId and Password is missing." });
  };

  const verifyOtp = async (req, res, next) => {
    const verifyData = req.body
    console.log(verifyData)
    const user = await UserOtp.findOne({
      where: { email: verifyData.email }
    }, function (err, data) {
      res.json(data)
    }).catch(err => {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
    });
    console.log('------->>>>>>>>>user', user);
    if (user) {
      if (user.dataValues.otp == verifyData.otp) {
        UserOtp.update({ verified: 1 }, {
          where: {
            email: verifyData.email
          }
        })
        res.send({ status: 'success', msg: "Verified successfully" })
      } else {
        res.send({
          status: "failed",
          msg: "OTP is Invalid"
        });
      }
    }
    else {
      res.send({
        status: "failed",
        msg: "user not exist"
      });
    }

  };

  const updateOtp = async (req, res, next) => {
    const { otpValue } = req.body;
    let otpCond = {};

    if (otpValue) {
      otpCond.active = "1";
      otpCond.otpValue = otpValue;
      try {
        otpAuth.update(
          { active: "0" },
          {
            where: { otpValue: otpValue },
            returning: true
          }
        );
        return res
          .status(httpStatus.OK)
          .json({ status: "success", msg: "Successfully updated." });
      } catch (err) {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", msg: errorMsg });
      }
    }
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: "error", msg: "OtpValue missing." });
  };

  return {
    login,
    userLogin,
    createUser,
    signupUser,
    forgetPassword,
    passwordChange,
    sendOtp,
    validateOtp,
    verifyOtp,
    updateOtp,
  };
};

module.exports = AuthController();
