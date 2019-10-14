const httpStatus = require("http-status");
const api = require("../services/api.service");


const lookupController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
	const getCountry = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/lookup/getCountry", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
    
    const getStateByCountryId = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/lookup/getStateByCountryId", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
    };
    
    const getCityByStateId = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/lookup/getCityByStateId", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

	return {
        getCountry,
        getStateByCountryId,
        getCityByStateId
	}
};
module.exports = lookupController();
