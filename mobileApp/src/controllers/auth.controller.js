const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const db = require("../config/sequelize");
var nodemailer = require("nodemailer");
const config = require("../config/config");
var otplib = require('otplib')
const path = require("path");
const User = db.TblUser;
const UserOtp = db.TblUserOtp
const otpAuth = db.TblOtpAuth;
var auth = require('otplib/authenticator')
const crypto = require('crypto')
auth.options = { crypto };

const ImagelogoSrc='data:image/jpeg;base64,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zv8A3yXy/I/SuG/9wj6v8zj68k94KACgDpfhx/yO2lf77f8AoDV6OU/75T/rozyM9/5F9X0X5o+hK++Py4KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPBvix/wAjtd/7kf8A6AK+Gzv/AHyXy/I/SuG/9wj6v8zj68k94KACgDpfhx/yO2lf77f+gNXo5T/vlP8ArozyM9/5F9X0X5o+hK++Py4KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPBvix/yO13/uR/8AoAr4bO/98l8vyP0rhv8A3CPq/wAzj68k94KACgDpfhx/yO2lf77f+gNXo5T/AL5T/rozyM9/5F9X0X5o+hK++Py4KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPBvix/yO13/ALkf/oAr4bO/98l8vyP0rhv/AHCPq/zOPryT3goAKAOl+HH/ACO2lf77f+gNXo5T/vlP+ujPIz3/AJF9X0X5o+hK++Py4KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/9k='.split("base64,")[1];



var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.googlemail.com', // Gmail Host
  port: 465, // Port
  secure: true, // this is true as port is 465
  auth: {
    user: "sploot.oasys@gmail.com",
    pass: "sploot@123" //give here correct gmail pwd
  }
  });
// var smtpTransport = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   domain: 'gmail.com',
//   auth: {
//     user: "sploot.oasys@gmail.com",
//     pass: "sploot@123" //give here correct gmail pwd
//   }
// });

const AuthController = () => {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
    @returns {}
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
          return res.status(httpStatus.OK).json({ msg: errorMsg });
        });
        if (user) {
          const loginType = user.dataValues.loginType
          loginType == 1 ? res.send({ status: "failed", msg: "User Name already Exist" }) :
            (loginType == 2 ? res.send({ status: "failed", msg: "User already have account with google" }) :
              (loginType == 3 ? res.send({ status: "failed", msg: "User already have account with facebook" }) :
                res.send({ status: "failed", msg: "Invalid login type" })));
        }
        else {
          if (userData.loginType == 1) {
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
                      loginType: postData.loginType,
                      userTypeId: 1
                    }, {
                        returning: true
                      })
                      .then(async (data) => {
                        await UserOtp.destroy({ where: { email: userData.email } })
                        console.log('data=============>>>>>>', data)
                        const token = authService().issue({ id: data.dataValues.userId });
                        console.log('token==========>>>', token)
                        res.send({ status: "success", msg: "User registered successfully", token: token, req: userData, res: data })
                      })
                      .catch(err => {
                        const errorMsg = err.errors ? err.errors[0].message : err.message;
                        return res.status(httpStatus.OK).json({ msg: errorMsg });
                      });
                  }
                })

            } catch (err) {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
            }
          } else if (userData.loginType == 2) {
            User.create({
              userName: userData.userName,
              email: userData.email,
              googlePassword: userData.password,
              loginType: userData.loginType,
              userTypeId: 1
            }, {
                returning: true
              })
              .then((data) => {
                const token = authService().issue({ id: data.dataValues.userId });
                res.send({ status: 'success', token: token, msg: "Successfully registered", req: userData, res: data });
              })
              .catch((err) => {
                res.send({ status: 'failed', msg: "Failed to register", err: err });
              })
          } else if (userData.loginType == 3) {
            User.create({
              userName: userData.userName,
              email: userData.email,
              facebookPassword: userData.password,
              loginType: userData.loginType,
              userTypeId: 1
            }, {
                returning: true
              })
              .then((data) => {
                const token = authService().issue({ id: data.dataValues.userId });
                res.send({ status: 'success', token: token, msg: "Successfully registered", req: userData, res: data });
              })
              .catch((err) => {
                res.send({ status: 'failed', msg: "Failed to register", err: err });
              })
          } else {
            res.send({ status: "failed", msg: "Invalid login type" })
          }

        }
      } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
      }
    } else {
      res.send({ status: 'failed', msg: 'please provide data' })
    }
  };

  const sendOtp = async (req, res, next) => {
    const postData = req.body
    const { email } = req.body;
    var date = new Date()
    const secret = JSON.stringify(await date.getMilliseconds())
    const otp = auth.generate(secret);
    if (email) {
      User.findOne({
        where: {
          email: email
        }
      })
        .then(async (data) => {
          if (data != null) {
             if (data.dataValues.loginType == 2) {
              res.send({ status: false, message: 'User already exists with Gmail' });
            }
            else if (data.dataValues.loginType == 3) {
              res.send({ status:false, message: 'User already exists with Facebook' });
            } else {
            try {
              const user = await UserOtp.findOne({
                where: {
                  email: email
                }
              }).catch(err => {
                const errorMsg = err.errors ? err.errors[0].message : err.message;
                return res.status(httpStatus.OK).json({ msg: errorMsg });
              });
              if (user) {
                var mailOptions = {
                  from: "sploot.oasys@gmail.com", // sender address
                  to: email, // list of receivers
                  subject: "Sploot account verification", // Subject line
                  text: otp, // plaintext body
                  // html: `<b>Your OTP is ${otp}</b>` // html body
                  html: `<div style="font-family: verdana; max-width:500px; margin-left">
                  <h1>Your one-time-password is ${otp}</h1>  <div><img src="cid:sploot_unique_id"/></div>
                  </div>
                  `,
                  attachments: [{
                    filename: 'Spoolt.jpg',
                    content: ImagelogoSrc,
                    encoding: 'base64'
                  }]
                }
                await smtpTransport.sendMail(mailOptions, function (error, response) {
                  if (error) {
                    console.log(error);
                  } else {
                    UserOtp.update(
                      { otp: otp },
                      {
                        where: {
                          email: email
                        }
                      }, {
                        returning: true
                      })
                      .then((data) => {
                        // console.log(data)
                        res.send({ status:true,data:data, message: "OTP resend successfully"})
                      })
                      .catch(err => {
                        const errorMsg = err.errors ? err.errors[0].message : err.message;
                        return res.status(httpStatus.OK).json({ status:false, message: errorMsg });
                      });
                  }
                });
              } else {
                try {
                  var mailOptions = {
                    from: "sploot.oasys@gmail.com", // sender address
                    to: email, // list of receivers
                    subject: "Sploot ", // Subject line
                    text: otp, // plaintext body
                    // html: `<b>Your OTP is ${otp}</b>` // html body
                    html: `
                    <div style="font-family: verdana; max-width:500px; margin-left">
                    <h1>Your one-time-password is ${otp}</h1> <div><img src="cid:sploot_unique_id"/></div>
                    </div>`,
                    attachments: [{
                      filename: 'Spoolt.jpg',
                      content:ImagelogoSrc,
                      encoding: 'base64'
                    }]
                  }
                  // send mail with defined transport object
                  await smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("soytrnfhgb")
                      const userOtp = UserOtp.create({
                        email: email,
                        otp: otp
                      }, {
                          returning: true
                        })
                        .then((data) => {
                          console.log(data)
                          return res.send({ status:true,data:data, message: "OTP sent successfully" })
                        })
                        .catch(err => {
                          const errorMsg = err.errors ? err.errors[0].message : err.message;
                          return res.status(httpStatus.OK).json({status:false, message: errorMsg });
                        });
                    }
                  });
                }
                catch (err) {
                  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:false, message: "Internal servers error" });
                }
              }
            } catch (err) {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:false, message: "Internal server error" });
            }
          }
        }
        else{
          try {
            const user = await UserOtp.findOne({
              where: {
                email: email
              }
            }).catch(err => {
              const errorMsg = err.errors ? err.errors[0].message : err.message;
              return res.status(httpStatus.OK).json({status:false, message: errorMsg });
            });
            if (user) {
              var mailOptions = {
                from: "sploot.oasys@gmail.com", // sender address
                to: email, // list of receivers
                subject: "Sploot account verification", // Subject line
                text: otp, // plaintext body
                // html: `<b>Your OTP is ${otp}</b>` // html body
                html: `<div style="font-family: verdana; max-width:500px; margin-left">
                <h1>Your one-time-password is ${otp}</h1>  <div><img src="cid:sploot_unique_id"/></div>
                </div>
                `,
                attachments: [{
                  filename: 'Spoolt.jpg',
                  content: ImagelogoSrc,
                  encoding: 'base64'
                }]
              }
              await smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                  console.log(error);
                } else {
                  UserOtp.update(
                    { otp: otp },
                    {
                      where: {
                        email: email
                      }
                    }, {
                      returning: true
                    })
                    .then((data) => {
                      // console.log(data)
                      res.send({ status:true,data:data,message: "OTP resend successfully"})
                    })
                    .catch(err => {
                      const errorMsg = err.errors ? err.errors[0].message : err.message;
                      return res.status(httpStatus.OK).json({status:false, message: errorMsg });
                    });
                }
              });
            } else {
              try {
                var mailOptions = {
                  from: "srumijthu@gmail.com", // sender address
                  to: email, // list of receivers
                  subject: "Sploot ", // Subject line
                  text: otp, // plaintext body
                  // html: `<b>Your OTP is ${otp}</b>` // html body
                  html: `
                  <div style="font-family: verdana; max-width:500px; margin-left">
                  <h1>Your one-time-password is ${otp}</h1> <div><img src="cid:sploot_unique_id"/></div>
                  </div>`,
                  attachments: [{
                    filename: 'Spoolt.jpg',
                    content:ImagelogoSrc,
                    encoding: 'base64'
                  }]
                }
                // send mail with defined transport object
                await smtpTransport.sendMail(mailOptions, function (error, response) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("soytrnfhgb")
                    const userOtp = UserOtp.create({
                      email: email,
                      otp: otp
                    }, {
                        returning: true
                      })
                      .then((data) => {
                        return res.send({ status:true,data:data, message: "OTP sent successfully" })
                      })
                      .catch(err => {
                        const errorMsg = err.errors ? err.errors[0].message : err.message;
                        return res.status(httpStatus.OK).json({status:false ,message: errorMsg });
                      });
                  }
                });
              }
              catch (err) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:false, message: "Internal servers error" });
              }
            }
          } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:false,message: "Internal server error" });
          }        }
        })
        .catch(err => {
          console.log(err);
        })
    }
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
      return res.status(httpStatus.OK).json({ msg: errorMsg }); 
    });
    if (user) {
      if (user.dataValues.otp === verifyData.otp) {
        UserOtp.update({ verified: 1 }, {
          where: {
            email: verifyData.email
          }
        })
        if(UserOtp)
         res.send({ status:true,data:verifyData, message: "Verified successfully"})
      } else {
        res.send({
          status:false,
          message: "OTP is Invalid"
        });
      }
    }
    else {
      res.send({
        status: false,
        message: "user not exist"
      });
    }

  };




  const login = async (req, res, next) => {
    const userData = req.body;
    if (userData) {
      try {
        const user = await User.findOne({
          where: { email: userData.email }
        })
        if (user != null) {
          if (user.dataValues.loginType == 1) {
            if (userData.password == (user.dataValues.password )) {
              const token = authService().issue({ id: user.dataValues.userId });
              return res
                .status(httpStatus.OK)
                .json({ status: true, token, data: user ,message:"Login SuccessFully."});
            }
          else {
            return res
            .status(httpStatus.OK)
            .json({ status:false, message: 'Password is incorrect' })
          }
          } 
          else if (user.dataValues.loginType == 2) {
            return res
            .status(httpStatus.OK)
            .json({ status:false, message: 'User already exists with Gmail' });
          }
          else if (user.dataValues.loginType == 3) {
            return res
            .status(httpStatus.OK)
            .json({ status:false, message: 'User already exists with Facebook' });
          }
        }
        else {
          return res
          .status(httpStatus.OK)
          .json({ status:false, message: 'User not found.' })
          }
      } catch (err) {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ status:false, message: errorMsg });
      }
      
    } else {
      return res
          .status(httpStatus.OK)
          .json({ status:false, message: 'please provide data' })
    }
    return res
      .status(httpStatus.OK)
      .json({ status:false, message: "Email or password is wrong" });
  };

  
  // const UserExitsCheck = async (req, res, next) => {
  //   const userData = req.body;
  //   if (userData) {
  //     try {
  //       const user = await User.findOne({
  //         where: { email: userData.email }
  //       })
  //       if (user != null) {
  //         if (user.dataValues.loginType == 1) {
  //           res.send({ status: 'sucess', msg: '' });
  //         } else if (user.dataValues.loginType == 2) {
  //           res.send({ status: 'sucess', msg: 'User already exists with Gmail' });
  //         }
  //         else if (user.dataValues.loginType == 3) {
  //           res.send({ status: 'sucess', msg: 'User already exists with Facebook' });
  //         }
  //       } else {
  //         res.send({ status: 'failed', msg: 'user not found' })
  //       }
  //     } catch (err) {
  //       const errorMsg = err.errors ? err.errors[0].message : err.message;
  //       return res
  //         .status(httpStatus.INTERNAL_SERVER_ERROR)
  //         .json({ status: "error", msg: errorMsg });
  //     }
  //   } else {
  //     res.send({ status: 'failed', msg: 'please provide data' })
  //   }
  //   return res
  //     .status(httpStatus.OK)
  //     .json({ status: "failed", msg: "Email is wrong" });
  // };

  const createAndLoginUser = async (req, res, next) => {
    const postData = req.body
    const user = await User.findOne({
      where: {
        email: postData.email
      }
    })
      .catch(err => {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res.status(httpStatus.OK).json({ msg: errorMsg });
      });
    if (user) {
      const loginType = user.dataValues.loginType
      if (postData.loginType == loginType) {
        const token = authService().issue({ id: user.dataValues.userId });
        res.send({ status:true, Token: token, data: user.dataValues,message :"Login Successfully." });
      } else {
        loginType == 1 ? res.send({ status:false, message: "User Name already Exist" }) :
          (loginType == 2 ? res.send({ status:false, message: "User already have account with Google" }) :
            (loginType == 3 ? res.send({ status:false, message: "User already have account with Facebook" }) :
              res.send({ status:false, message: "Invalid login type" })));
      }
    } else {
      if (postData.loginType == 2) {
        User.create({
          userName: postData.userName,
          email: postData.email,
          googlePassword: postData.password,
          loginType: postData.loginType,
          userTypeId: 1
        }, {
            returning: true
          })
          .then((data) => {
            const token = authService().issue({ id: data.dataValues.userId });
            res.send({ status:true, token: token,data:data, message: "Successfully registered with google" });
          })
      } else if (postData.loginType == 3) {
        User.create({
          userName: postData.userName,
          email: postData.email,
          facebookPassword: postData.password,
          loginType: postData.loginType,
          userTypeId: 1
        }, {
            returning: true
          })
          .then((data) => {
            const token = authService().issue({ id: data.dataValues.userId });
            res.send({ status:true, token: token,data:data, message: "Successfully registered with facebook" });
          })
          .catch((err) => {
            res.send({ status:false, message: "Failed to register", err: err });
          })
      } else {
        res.send({ status:false, message: "Invalid login type" })
      }
    }
  }

  const forgetPasswordSendOtp = async (req, res, next) => {
    const postData = req.body
    var date = new Date()
    const secret = JSON.stringify(await date.getMilliseconds())
    const otp = auth.generate(secret);
    User.findOne({
      where: {
        email: postData.email
      }
    })
      .then(async (data) => {
        if (data == null) {
          res.send({ status:false, message: "User doesn't exist" })
        } else {

          const user = await UserOtp.findOne({
            where: {
              email: postData.email
            }
          }).catch(err => {
            const errorMsg = err.errors ? err.errors[0].message : err.message;
            return res.status(httpStatus.OK).json({ status:false ,message: errorMsg });
          });
          if (user) {
            var mailOptions = {
              from: "sploot.oasys@gmail.com", // sender address
              to: postData.email, // list of receivers
              subject: "Sploot account verification", // Subject line
              text: otp, // plaintext body
              // html: `<b>Your OTP is ${otp}</b>` // html body
              html: `<div style="font-family: verdana; max-width:500px; margin-left">
            <h1>Your one-time-password is ${otp}</h1> <div><img src="cid:sploot_unique_id"/></div>
            </div>
            `,
              attachments: [{
                filename: 'Spoolt.jpg',
                content:ImagelogoSrc,
                encoding: 'base64'
              }]
            }
            await smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
              } else {
                UserOtp.update(
                  { otp: otp },
                  {
                    where: {
                      email: postData.email
                    }
                  }, {
                    returning: true
                  })
                  .then((data) => {
                    console.log(data)
                    res.send({ status: true, data:data ,message: "OTP resend successfully" })
                  })
                  .catch(err => {
                    const errorMsg = err.errors ? err.errors[0].message : err.message;
                    return res.status(httpStatus.OK).json({ status:false ,message: errorMsg });
                  });
              }
            });
          } else {
            try {
              console.log('postdata', postData)
              var mailOptions = {
                from: "sploot.oasys@gmail.com", // sender address
                to: postData.email, // list of receivers
                subject: "Sploot ", // Subject line
                text: otp, // plaintext body
                // html: `<b>Your OTP is ${otp}</b>` // html body
                html: `
              <div style="font-family: verdana; max-width:500px; margin-left">
              <h1>Your one-time-password is ${otp}</h1> <div><img src="cid:sploot_unique_id"/></div>
              </div>`,
              attachments: [{
                filename: 'Spoolt.jpg',
                content:ImagelogoSrc,
                encoding: 'base64'
              }]
              }
              // send mail with defined transport object
              await smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                  console.log(error);
                } else {
                  const userOtp = UserOtp.create({
                    email: postData.email,
                    otp: otp
                  }, {
                      returning: true
                    })
                    .then((data) => {
                      console.log(data)
                      return res.send({ status:true,data:data, message: "OTP sent successfully" })
                    })
                    .catch(err => {
                      const errorMsg = err.errors ? err.errors[0].message : err.message;
                      return res.status(httpStatus.OK).json({status:false, message: errorMsg });
                    });
                }
              });
            }
            catch (err) {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status:false ,message: "Internal servers error" });
            }
          }

        }
      })
  }

  const generateOTP = async () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const forgetPassword = async (req, res, next) => {
    console.log(req.body);
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
          port: 588,
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
              status:true,
              data:otpCreate,
              message: "success"
            });
          }
        });
      } else {
        return res
          .status(httpStatus.OK)
          .json({ status:false, message: "User not found" });
      }
    } else {
      return res
        .status(httpStatus.OK)
        .json({ status: false, message: "Username is missing." });
    }
  };

  const passwordChange = async (req, res, next) => {
    const postData = req.body;
    if (postData) {
      // var passwrd = bcryptService().updatePassword(password);
      const password = postData.password
      const user = await UserOtp.findOne({
        where: {
          email: postData.email,
          verified: 1
        }
      })
      if (user) {
        await User.update(
          { password: password, updatedAt: new Date() },
          {
            where: {
              email: postData.email
            }
          }
        )
          .then((data) => {
            return res.send({ status:true,data:data, message: "Successfully updated."});
          })
          .catch(err => { res.send({ status: false, message: 'failed to update',error: err }) })
      } else {
        res.send({ status:false, message: 'email is not verified' })
      }
    } else {
      return res
        .status(httpStatus.OK)
        .json({ status:false, message: "email and Password is missing." });
    }
  };

  return {
    login,
    createUser,
    forgetPassword,
    passwordChange,
    sendOtp,
    verifyOtp,
    createAndLoginUser,
    forgetPasswordSendOtp
  };

};

module.exports = AuthController();