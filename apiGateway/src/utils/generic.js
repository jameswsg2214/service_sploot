const _ = require("lodash");
const crypto = require("crypto");
const HttpStatus = require("http-status");
const Constants = require("./constant");
const JWT = require("jsonwebtoken"); // used to create, sign, and verify tokens
const CONFIG = require("./../config/config");
const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");
const path = require("path");
const algorithm = "aes-256-ctr";
const password = "Q$f83nJf";
const tokenReplaceValue = "#1Q6W";

module.exports = {
	encryptString(text) {
		const cipher = crypto.createCipher(algorithm, password);
		let crypted = cipher.update(text, "utf8", "hex");
		crypted += cipher.final("hex");
		return crypted;
	},

	decryptString(text) {
		const decipher = crypto.createDecipher(algorithm, password);
		let dec = decipher.update(text, "hex", "utf8");
		dec += decipher.final("utf8");
		return dec;
	},

	constructErrorMessage(error) {
		var errMessage = "";
		if (error.message) {
			errMessage = error.message;
		}
		if (error.errors && error.errors.length > 0) {
			errMessage = error.errors
				.map(function(err) {
					return err.message;
				})
				.join(",\n");
		}

		return errMessage;
	},

	getReqValues(req) {
		return _.omitBy(_.extend(req.body, req.params, req.query), _.isNil);
	},

	getResult(responseResult) {
		// console.log('Response', responseResult);
		if (responseResult.error) {
			if (responseResult.error["errorMessage"]) {
				return { success: false, message: responseResult.error["errorMessage"] };
			} else {
				return { success: false, message: responseResult.error };
			}
		}

		if (_.has(responseResult, "result")) {
			if (responseResult.result && responseResult.result["message"]) {
				return { success: true, message: responseResult.result["message"] };
			} else {
				const responseObject = { success: true };
				if (responseResult["result"]["rows"]) {
					responseObject["data"] = responseResult["result"]["rows"];
					responseObject["count"] = responseResult["result"]["count"];
				} else {
					responseObject["data"] = responseResult["result"];
				}
				return responseObject;
			}
		}
	},

	sendSuccessResponse(response, result) {
		const statusCode = HttpStatus.OK;
		response.status(statusCode).send(this.getResult(result));
	},

	sendFailureResponse(response, result) {
		// console.log('result', result);
		let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
		if (result.error["errorMessage"]) {
			if (
				result.error["errorMessage"] == Constants.INVALID_USER ||
				result.error["errorMessage"] == Constants.DISABLED_USER
			) {
				statusCode = HttpStatus.UNAUTHORIZED;
			} else if (result.error["errorMessage"] == Constants.NOT_FOUND) {
				statusCode = HttpStatus.NOT_FOUND;
			}
		} else if (result["type"] && result["type"] == Constants.VALIDATION_ERROR) {
			statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
		}
		response.status(statusCode).send(this.getResult(result));
	},

	getAPIPort() {
		return CONFIG.API_PORT;
	},

	getJWTTokenSecret() {
		return CONFIG.secretKey;
	},

	generateToken(data) {
		// console.log("config", config);
		data.name = "admin";
		let token = JWT.sign({ u: data.name }, CONFIG.SECRET_KEY, {
			expiresIn: CONFIG.TOKEN_LIFE
		});
		token = token.replace(".", tokenReplaceValue);
		return token;
	},

	verifyToken(tokenValue, callback) {
		const token = tokenValue.replace(tokenReplaceValue, ".");
		JWT.verify(token, CONFIG.SECRET_KEY, function(err, decoded) {
			callback(err, decoded);
		});
	},

	generatePassword(password) {
		return password ? bcrypt.hashSync(password) : bcrypt.hashSync(CONFIG.defaultPassword);
	},

	comparePassword(password, existingPassword) {
		return bcrypt.compareSync(password, existingPassword);
	},

	insertInitialRecords() {
		// userAction.addUserDetails();
		const userAction = require("./../app/users/action");
		fs.readFile(path.join(__dirname, "initialRecords.json"), (err, data) => {
			if (data) {
				const initialRecords = JSON.parse(data);
				Object.keys(initialRecords).forEach(tableName => {
					_.forEach(initialRecords[tableName], records => {
						try {
							console.log("Initial Record success");
							// userAction.addUserDetails(records, (result) => {
							//     if (result.error) {
							//         console.error('Initial Record Error', result.error);
							//     } else {
							//         console.log('Initial Records Created');
							//     }
							// });
						} catch (err) {
							console.error("Initial Record Error", err);
						}
					});
				});
			}
		});
	}
};
