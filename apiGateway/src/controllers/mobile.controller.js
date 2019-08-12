const httpStatus = require("http-status");
const axios = require("axios");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Utils = require("../utils/generic");
const api = require("../services/api.service");

const MobileController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
	const login = async (req, res, next) => {
		console.log(req.body);

		api.makeServiceCall("POST", "mobile", "/auth/login", req.body, req.headers)
			.then(response => {
				res.send(response); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	
	const createUser = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/user/createUser", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const verifyOtp = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/user/verifyOtp", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	

	const deleteUser = async (req, res, next) => {
		api.makeServiceCall("PUT", "mobile", "/user/deleteUser", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	
	const getuserById = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/user/getuserById", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	const updateUserbyId = async (req, res, next) => {
		api.makeServiceCall("PUT", "mobile", "/user/updateUserbyId", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	return {
		login,
		createUser,
		verifyOtp,
		deleteUser,
		getuserById,
		updateUserbyId,
	};
};

module.exports = MobileController();
