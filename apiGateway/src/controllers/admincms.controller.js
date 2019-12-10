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
		api.makeServiceCall("POST", "admin", "/admincms/getCMSlist", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};


	const getCMSbyId = async (req, res, next) => {
		api.makeServiceCall("POST", "admin", "/admincms/getCMSbyId", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const deleteCMSdetails = async (req, res, next) => {
		api.makeServiceCall("PUT", "admin", "/admincms/deleteCMSdetails", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const updateCMSdetails = async (req, res, next) => {
		api.makeServiceCall("PUT", "admin", "/admincms/updateCMSdetails", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
    
    const addCMSdetails = async (req, res, next) => {
		api.makeServiceCall("POST", "admin", "/admincms/addCMSdetails", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
    
	const addAdmindetails = async (req, res, next) => {
		api.makeServiceCall("POST", "admin", "/admincms/addAdmindetails", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log('=================>>>>',err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
	
	const getAdminlist = async (req, res, next) => {
		api.makeServiceCall("POST", "admin", "/admincms/getAdminlist", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log('=================>>>>',err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
	return {
		getCMSlist,
		getCMSbyId,
		deleteCMSdetails,
        updateCMSdetails,
		addCMSdetails,
		addAdmindetails,
		getAdminlist
	}
};
module.exports = cmsDetailsController();
