const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")
const multer = require('multer')
const ImageTbl = db.TblImageUpload;

const imageUploadController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

  const deleteImage = async (req, res, next) => {
    const { imageId } = req.body
    ImageTbl.destroy({ where: { imageId: imageId } }).then((data) => {
      res.send({ status: 'success', msg: 'Image deleted successfully', data: data })
    })
  }
  
  const getImage = async (req, res, next) => {
    const postData = req.body;
    ImageTbl.findAll({
      where: {
        imageCategoryId: postData.imageCategoryId,
        uploadDate: postData.uploadDate
      }
    }).then((data) => {
      console.log(data)
      res.send({ status: 'success', msg: 'Successfully fetching image', data: data })
    })
  }

  return {
    deleteImage,
    getImage
  };
};


module.exports = imageUploadController();