const httpStatus = require("http-status");
const db = require("../config/sequelize");
const User = db.TblUser;
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");
var fs = require("file-system")
const path = require("path");
const multer = require('multer')
const ImageTbl = db.TblImageUpload;
var express = require('express')
var app = express()
const imageUploadController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

  const imageUpload = async (req, res, next) => {
    console.log(req.body)
    const postData = req.body
    ImageTbl.create({
      userId: postData.userId,
      imageCategoryId: postData.imageCategoryId,
      uploadDate: postData.uploadDate,
      imagePath: postData.imagePath
    }).then(async (data) => {
      return res
            .status(httpStatus.OK)
            .json({ status: "success", msg: 'Image uploaded successfully', req: postData, res: data });
    }).catch(err => {
      res.send({ status: 'failed', msg: 'failed to upload images', error: err })
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
      res.send({ status: 'success', msg: 'Successfully fetching image',req: postData,res: data })
    })
  }

  const deleteImage = async (req, res, next) => {
    const { imageId } = req.body
    ImageTbl.destroy({ where: { imageId: imageId } }).then((data) => {
      res.send({ status: 'success', msg: 'Image deleted successfully', req: postData,res: data })
    })
  }

  return {
    deleteImage,
    imageUpload,
    getImage
  };
};


module.exports = imageUploadController();