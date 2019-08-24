const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")
const multer = require('multer')
const ImageUpload = db.TblImageUpload;

const imageUploadController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

    const deleteImage = async(req,res,next)=>{
        const {imageId} = req.body
        ImageUpload.update({active: '0'},{where:{imageId: imageId}}).then((data)=>{
            res.send({status: 'success',msg:'Image deleted successfully',data:data})
        })
    }
  return {
    deleteImage
  };
};


module.exports = imageUploadController();