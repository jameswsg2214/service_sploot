const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const db = require("../config/sequelize");
var nodemailer = require("nodemailer");
var moment = require("moment");
const _  = require('lodash');

const User = db.TblUser;
const UserRoles = db.TblUserRoles;
const UserTypes = db.TblUserTypes;



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
    let userCond = {};
    let activityResponse;
    let groupresp;

    userCond.userTypeId = 1;
    userCond.active = "1";
    if (isNaN(username)) {
        userCond.email = username;
    } else {
        userCond.phoneNo = username;
    }

    if (username && password) {
        try {
            const user = await User.findOne({
                where: userCond
            });
            if(user){
                    const userRoles = await UserRoles.findAll({where : {userId : user.dataValues.userId},
                    raw:true});

                    let roleIds = _.map(userRoles, 'roleId');
                   // console.log("roleIds",roleIds);
                
                    const constrolactivity = await db.TblRoleActivityMap.findAll({where : {roleId : roleIds}});
                    let activityIds = _.map(constrolactivity, 'activityId');
                   // console.log("activityIds",activityIds);
                    let activityConditions = {};
                    activityConditions['activityId'] = activityIds;
                    activityConditions['active'] = '1';
                    activityResponse = await db.TblActivityMaster.findAll({where : activityConditions});

                 groupresp =	_.groupBy(activityResponse, 'menuGroupName');
            
            }
        
        //	console.log("user",user);
            if (!user) {
                return res.status(httpStatus.BAD_REQUEST).json({ msg: "User not found" });
            }
            if (bcryptService().comparePassword(password, user.password)) {
               // const token = authService().issue({ id: user.id });
                

                return res.status(httpStatus.OK).json({ token,user,groupresp});
            }
            // return res
            //   .status(httpStatus.UNAUTHORIZED)
            //   .json({ msg: "Email or password is wrong" });
        } catch (err) {
          //  console.log(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
        }
    }

    return res.status(httpStatus.BAD_REQUEST).json({ msg: "Email or password is wrong works" });
};
return {
    login,
};
};