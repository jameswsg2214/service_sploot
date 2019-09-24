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
      petId: postData.petId,
      userId: postData.userId,
      // imageCategoryId: postData.imageCategoryId,
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
        petId: postData.petId,
        userId: postData.userId,
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
      res.send({ status: 'success', msg: 'Image deleted successfully', req: imageId,res: data })
    })
  }

  const  getallimagebydate = async (req, res, next) => {
    const response = []
    console.log(req.body)
    const postData = req.body
    ImageTbl.findAll({
      petId: postData.petId,
      userId: postData.userId,
    }).then(async (data) => {
      data.forEach((item, i)=>{
        const value = {}
        console.log("======>>>item",i)
        value.imagePath = item.dataValues.imagePath
        value.uploadDate = item.dataValues.uploadDate
        response.push(value)
        response.push(value)
      })
      setTimeout(() => {
        return res
        .status(httpStatus.OK)
        .json({ status: "success", msg: 'Image fetched successfully with date', req: postData, res: response });
    }, 3000);
      
    }).catch(err => {
      res.send({ status: 'failed', msg: 'failed to fetch  with  date', error: err })
    })
  }
 
  return {
    deleteImage,
    imageUpload,
    getImage,
    getallimagebydate
  };
};


module.exports = imageUploadController();