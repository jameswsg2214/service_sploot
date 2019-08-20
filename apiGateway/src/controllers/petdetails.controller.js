const httpStatus = require("http-status");
const axios = require("axios");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Utils = require("../utils/generic");
const api = require("../services/api.service");

const petDetailsController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

	
	const getPetCategory = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getPetCategory", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	

	const getBreedTypeId = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getBreedTypeId", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };

	const getBreedMaster = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getBreedMaster", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	
	const getPetMaster = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getPetMaster", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const postPetMaster = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/postPetMaster", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	
	const deletePetdetails = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/deletePetdetails", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	
	const updatePetdetails = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/updatePetdetails", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	
	const postPetWeight = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/postPetWeight", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};


	return {
		getPetCategory,
		getBreedTypeId,
		getPetMaster,
		getBreedMaster,
		postPetMaster,
		deletePetdetails,
		updatePetdetails,
		postPetWeight
	};
};

module.exports = petDetailsController();
