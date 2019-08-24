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
	const deletePetWeight = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/deletePetWeight", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const getRxMaster = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getRxMaster", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const postRxMaster = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/postRxMaster", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const postRxDtl = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/postRxDtl", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const postRxFreq = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/postRxFreq", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const deleteRxMaster = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/deleteRxMaster", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const updateRxMaster = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/updateRxMaster", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const getMedication = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getMedication", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};



	const getBrandmst = async (req, res, next) => {
		// console.log("U in api gateway.................")
		api.makeServiceCall("POST", "mobile", "/petdetails/getbrandmst", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	const getActivity = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getActivity", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	    const getweightByDate = async (req, res, next) => {
		        api.makeServiceCall("POST", "mobile", "/petdetails/getweightByDate", req.body)
		            .then(response => {
		                res.send(response.data); // <= send data to the client
		            })
		            .catch(err => {
		                console.log(err.response.status);
		                res.status(err.response.status).json(err.response.data);
		            });
	}
	const rxMasterBulk = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/rxMasterBulk", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	
	// getMasterByID
	const getPetMasterById = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/getPetMasterById", req.body)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
	// petMstBulkInsert

	const petMstBulkInsert = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/petdetails/petMasterBulk", req.body)
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
		postPetWeight,
		getRxMaster,
		postRxMaster,
		postRxDtl,
		postRxFreq,
		deleteRxMaster,
		updateRxMaster,
		deletePetWeight,
		getMedication,
		getActivity,
		getweightByDate,
		getBrandmst,
		rxMasterBulk,
		getPetMasterById,
		petMstBulkInsert
	};
};

module.exports = petDetailsController();
