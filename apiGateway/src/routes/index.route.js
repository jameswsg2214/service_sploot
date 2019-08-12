const express = require("express");
const authRoutes = require("./auth.route");
// const mobileRoutes = require("./mobile.route");
const adminRoutes = require("./admin.route");
const authService = require("../services/auth.service");

// swaggerUI API
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger/swagger.json");
const router = express.Router(); // eslint-disable-line new-cap

function _validateToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      var verify = await authService().verify(token);
      var decoded = await authService().decode(token);
      resolve({
        status: "success",
        msg: "Successful Authorization!",
        decoded: decoded
      });
    } catch (err) {
      // err
      reject({ status: "error", msg: "Invalid Token", err: err });
    }
  });
}

// mount auth routes at /auth
router.use("/auth", authRoutes);


// router.use("/apim", mobileRoutes);
router.use("/apia", adminRoutes);



module.exports = router;
