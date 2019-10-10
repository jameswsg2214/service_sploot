const express = require("express");
const authRoutes = require("./auth.route");
const mobileRoutes = require("./mobile.route");
const adminRoutes = require("./admin.route");
const secret = require('../config/config')
const authService = require("../services/auth.service");

// swaggerUI API
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger/swagger.json");
const router = express.Router(); // eslint-disable-line new-cap

function _validateToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('=============>>>>>>>>token',token)
      var verify = await authService().verify(token,secret.jwtSecret,(err,result)=>{
        console.log('================>>>>result',result)
      });
      resolve({
        status: "success",
        msg: "Successful Authorization!",
        verify:verify
      });
    } catch (err) {
      // err
      console.log('failed')
      reject({ status: "error", msg: "Invalid Token", err: err });
    }
  });
}

// mount auth routes at /auth
router.use("/auth", authRoutes);

var anonymousUrls = ["api-docs", "/auth"];
router.use(function(req, res, next) {
  try {
    var isAnonymousUrl = anonymousUrls.some(function(regex) {
      var buf = Buffer.from(req.originalUrl);
      return buf.indexOf(regex) > -1;
    });
    if (isAnonymousUrl) return next();
    else if (req.method !== "OPTIONS") {
      var token = req.headers["x-access-token"];
      console.log(token, "Token Undefined");
      _validateToken(token).then(
        res => {
          console.log("_validateToken", res);
          next();
        },
        err => {
          res.status(403).send({
            status: "error",
            msg: "Failed to authenticate user",
            err: err
          });
        }
      );
    } else {
      next();
    }
  } catch (e) {
    return res.status(400).json({ message: e });
  }
});

const swaggerDefinition = swaggerDocument;

const options = {
  swaggerDefinition,
  apis: ["./routes/index.route*.js"]
};

const swaggerSpec = swaggerJSDoc(options);
router.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


router.use("/apim", mobileRoutes);
router.use("/apia", adminRoutes);
// router.use("/apia", adminpanelRoutes);



module.exports = router;
