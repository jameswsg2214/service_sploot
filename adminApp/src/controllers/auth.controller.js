const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const db = require("../config/sequelize");
var nodemailer = require("nodemailer");
var moment = require("moment");
const _  = require('lodash');

const User = db.TblUser;



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
        const UserTypeCondition={}
        UserTypeCondition.userTypeId=2,
        UserTypeCondition.email=userData.email
        if (userData) {
          try {
            const user = await User.findOne({
              where: UserTypeCondition
            })
            if (user != null) {
                if (userData.password == (user.dataValues.password )) {
                  const token = authService().issue({ id: user.dataValues.userId });
                  return res
                    .status(httpStatus.OK)
                    .json({ status: "success", token, req: userData, res: user });
                }
              else {
                return res
                .status(httpStatus.FAILED_DEPENDENCY)
                .json({ status: 'failed', msg: 'Password is incorrect' })
              }
            }
            else {
              return res
              .status(httpStatus.BAD_REQUEST)
              .json({ status: 'failed', msg: 'User not found.' })
              }
          } catch (err) {
            const errorMsg = err.errors ? err.errors[0].message : err.message;
            return res
              .status(httpStatus.INTERNAL_SERVER_ERROR)
              .json({ status: "error", msg: errorMsg });
          }
        } else {
          return res
              .status(httpStatus.BAD_REQUEST)
              .json({ status: 'failed', msg: 'please provide data' })
        }
      };
return {
  adminlogin
};
};
module.exports = AuthController();