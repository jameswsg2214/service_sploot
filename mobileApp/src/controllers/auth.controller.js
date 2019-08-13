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


const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
const token = otplib.authenticator.generate(secret);

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

    const { username, password } = req.body;

    if (username && password) {
      try {
        const user = await User.findOne({
          where: { email: username }
        })

        if (!user) {
          return res
            .status(httpStatus.OK)
            .json({ status: "error", msg: "User not found" });
        }
        if (password === user.password) {
          const token = authService().issue({ id: user.id });
          return res
            .status(httpStatus.OK)
            .json({ status: "success", token, User: user });
        }
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ status: "error", msg: "Email or password is wrong" });
      } catch (err) {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: "error", msg: errorMsg });
      }
    }

    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: "error", msg: "Email or password is wrong works" });
  };

  const sendOtp = async (req, res, next) => {
    const { email } = req.body;
    var mailOptions = {
      from: "sploot.oasys@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Sploot ", // Subject line
      text: token, // plaintext body
      html: `<b>Your OTP is ${token}</b>` // html body
    }
    console.log(email);
    
    if (email) {
      try {
        console.log('----<.>,');
        
        const user = await UserOtp.findOne({
          where: {
            email: email
          }
        }).catch(err => {
          const errorMsg = err.errors ? err.errors[0].message : err.message;
          return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
        });
        console.log('------------>>>>',user)
        if (user) {
          await smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
            } else {
              console.log('asdsdfsdfsdfsdf---------------');
              
              const userOtp = UserOtp.update(
                { otp: token },
                {
                  where: {
                   email: email
                  }
                }, {
                  returning: true
                })
                .then((data) => {
                  res.send({msg: "OTP sent successfully"})
                })
                .catch(err => {
                  const errorMsg = err.errors ? err.errors[0].message : err.message;
                  return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
                });
                console.log('-------->>>>>>>userotp');
                
            }
          });
        } else {
          try {
            const postData = req.body;
            console.log('postdata', postData)
            // send mail with defined transport object
            await smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
              } else {
                console.log('---------<>>sending');
                
                const userOtp = UserOtp.create({
                  email: email,
                  otp: token
                }, {
                    returning: true
                  })
                  .then((data) => {
                    return res.send({ msg: "OTP sent successfully" })
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
    if(user){
      if (user.dataValues.otp == verifyData.otp) {
        res.send({status: 'Success', msg: "Verified successfully"})
      } else {
        res.send({
          status:"failed",
          msg: "OTP is Invalid"
        });
      }
    }
    else{
      res.send({
        status:"failed",
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
    forgetPassword,
    passwordChange,
    sendOtp,
    validateOtp,
    verifyOtp,
    updateOtp
  };
};

module.exports = AuthController();
