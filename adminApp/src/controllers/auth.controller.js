const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const db = require("../config/sequelize");
var nodemailer = require("nodemailer");
var moment = require("moment");
const _  = require('lodash');

const User = db.TblUser;

const AddAdminUser = db.TblAdminUser

const AuthController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
    const adminlogin = async (req, res, next) => {
        const userData = req.body;
        console.log(userData)
        const UserTypeCondition={}
        UserTypeCondition.password=userData.password,
        UserTypeCondition.email=userData.email
        if (userData) {
          try {
            const user = await AddAdminUser.findOne({
              where: UserTypeCondition
            })
            if (user != null) {
                if (userData.password == (user.dataValues.password )) {
                  const token = authService().issue();
                  return res
                    .status(httpStatus.OK)
                    .json({ status: true, token, data:user, message:"login Successfully." });
                }
              else {
                return res
                .status(httpStatus.OK)
                .json({ status: false, data:[] , message:"Password is incorrect" });
              }
            }
            else {
              return res
              .status(httpStatus.OK)
              .json({ status: false,data:[],message:"User not found." });
              }
          } catch (err) {
            const errorMsg = err.errors ? err.errors[0].message : err.message;
            return res
              .status(httpStatus.INTERNAL_SERVER_ERROR)
              .json({ status: false,message:errorMsg});
          }
        } else {
          return res
              .status(httpStatus.BAD_REQUEST)
              .json({ status: false,message:"please provide data"});
        }
      };

    //create admin
    const createadmin = async (req, res, next) => {
      const userData = req.body;
      if (userData) {
        try {
          const user = await User.findOne({
            where: {
              email: userData.email
            }
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
                userTypeId: 2
              }, {
                  returning: true
                })
                .then(async (data) => {
                  await UserOtp.destroy({ where: { email: userData.email } })
                  console.log('data=============>>>>>>', data)
                  const token = authService().issue({ id: data.dataValues.userId });
                  console.log('token==========>>>', token)
                  res.send({ status: "success", msg: "Admin registered successfully", token: token, req: userData, res: data })
                })
                .catch(err => {
                  const errorMsg = err.errors ? err.errors[0].message : err.message;
                  return res.status(httpStatus.OK).json({ msg: errorMsg });
                });
            }
          })
          })
        } catch (err) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
        }
      } else {
        res.send({ status: 'failed', msg: 'please provide data' })
      }
    };  
return {
  adminlogin,
  createadmin
};
};
module.exports = AuthController();