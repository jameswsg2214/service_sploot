const httpStatus = require("http-status");
const axios = require("axios");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Utils = require("../utils/generic");
const api = require("../services/api.service");

const AuthController = () => {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  const login = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall("POST", "mobile", "/auth/login", req.body, req.headers)
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const createUser = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/auth/createUser", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
  
  const createAndLoginUser = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/auth/createAndLoginUser", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};

  const sendOtp = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall("POST", "mobile", "/auth/sendOtp", req.body, req.headers)
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const verifyOtp = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall("POST", "mobile", "/auth/verifyOtp", req.body, req.headers)
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };
  const forgetPasswordSendOtp = async (req, res, next) => {
		api.makeServiceCall("POST", "mobile", "/auth/forgetPasswordSendOtp", req.body, req.headers)
			.then(response => {
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
			});
	};
  const adminlogin = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall("POST", "admin", "/auth/adminlogin", req.body, req.headers)
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const forgetPassword = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall(
        "POST",
        "mobile",
        "/auth/forgetPassword",
        req.body,
        req.headers
      )
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const validateOtp = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall(
        "POST",
        "mobile",
        "/auth/validateOtp",
        req.body,
        req.headers
      )
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const passwordChange = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall(
        "POST",
        "mobile",
        "/auth/passwordChange",
        req.body,
        req.headers
      )
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const updateOtp = async (req, res, next) => {
    console.log(req.body);
    api
      .makeServiceCall(
        "POST",
        "mobile",
        "/auth/updateOtp",
        req.body,
        req.headers
      )
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).json(err.response.data);
      });
  };
  return {
    login,
    createUser,
    sendOtp,
    verifyOtp,
    forgetPassword,
    passwordChange,
    adminlogin,
    validateOtp,
    updateOtp,
    createAndLoginUser,
    forgetPasswordSendOtp
  };
};
module.exports = AuthController();
