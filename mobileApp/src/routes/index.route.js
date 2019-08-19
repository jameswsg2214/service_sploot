const express = require("express");
const userRoutes = require("./user.route")
const authRoutes = require("./auth.route");
const config = require("../config/config");
const petdetailsRoutes = require("./petdetails.route");

const router = express.Router();

function _validateToken(token) {
	return new Promise(async (resolve, reject) => {
		try {
			//Need to decrypt and check the condition here for
			var decoded = await authService().decode(token);
			console.log(decoded)
			var verify = await authService().verify(token, (err, result) => { console.log('===========>>>>>>>>>>', result) });
			console.log(verify)
			if (verify == false) {
				throw "Unautherized";
			}
			resolve({
				status: "success",
				mes: "Successful Authorization!",
				decoded: decoded
			});
		} catch (err) {
			// err
			reject({ status: "error", mes: "Invalid Token", err: err });
		}
	});
}

router.use("/auth", authRoutes);

router.use((req, res, next) => {
	// if (!req.headers['x-access-token']) return next('router')
	if (req.method !== "OPTIONS") {
		var token = req.headers["authorization"];
		console.log(req.headers);
		console.log(token);
		//Token Validation
		_validateToken(token).then(
			res => {
				console.log("_validateToken", res);
				next();
			},
			err => {
				res.status(403).send({
					status: "error",
					message: "Failed to authenticate user",
					err: err
				});
			}
		);
	} else {
		next();
	}
});


router.use('/user', userRoutes);
router.use("/petdetails", petdetailsRoutes);


module.exports = router