const express = require("express");
const userRoutes = require("./user.route")
const authRoutes = require("./auth.route");
const config = require("../config/config");

const router = express.Router();


function _validateToken(token) {
	return new Promise(async (resolve, reject) => {
		try {
			//Need to decrypt and check the condition here for
			if (config.jwtSecret != token) {
				throw "Unautherized";
			}

			resolve({
				status: "success",
				mes: "Successful Authorization!",
				token: token
			});
		} catch (err) {
			// err
			reject({ status: "error", mes: "Invalid Token", err: err });
		}
	});
}

router.use('/user',userRoutes);
router.use("/auth", authRoutes);

module.exports = router