const httpStatus = require("http-status");
const axios = require("axios");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Utils = require("../utils/generic");
const api = require("../services/api.service");
var ImageUploadShema = require('../models/imageModel');
var moment = require('moment');


const cmsDetailsController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */


	const getCMSlist = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/cmsdetails/getCMSlist", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};


	const getCMSbyId = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/cmsdetails/getCMSbyId", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const deleteCMSdetails = async (req, res, next) => {
		api.makeServiceCall("PUT", "mobile", "/cmsdetails/deleteCMSdetails", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const updateCMSdetails = async (req, res, next) => {
		api.makeServiceCall("PUT", "mobile", "/cmsdetails/updateCMSdetails", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
    
    const addCMSdetails = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/cmsdetails/addCMSdetails", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
    
    

	return {
		getCMSlist,
		getCMSbyId,
		deleteCMSdetails,
        updateCMSdetails,
        addCMSdetails,
	}
};
module.exports = cmsDetailsController();
