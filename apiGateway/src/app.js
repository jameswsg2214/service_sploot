const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpStatus = require("http-status");
const expressWinston = require("express-winston");
const expressValidation = require("express-validation");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const api = require("../src/services/api.service");

// Image Uploads
const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    const filePath = path.resolve(__dirname, "uploads/images");
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    cb(null, filePath);
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const imageUpload = multer({
  storage: imageStorage
});

const fs = require("fs");

const winstonInstance = require("./helpers/winston");
const routes = require("./routes/index.route");
const APIError = require("./helpers/APIError");
const config = require("./config/config");
const mongodb = require("./mongodb");

mongodb.connect(function(err) {
  if (err) console.log("Unable to connect to mongoDB", err);
});

const app = express();
// const apiRoutes     = 	express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(bodyParser.json({limit :'50mb'}));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ limit: "50mb" }));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger("dev"));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
var publicDir = path.join(__dirname, "uploads");
app.use(express.static(publicDir));

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors
      .map(error => error.messages.join(". "))
      .join(" and ");
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== "test") {
  app.use(
    expressWinston.errorLogger({
      winstonInstance
    })
  );
}

// error handler, send stacktrace only during development
app.use((
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === "development" ? err.stack : {}
  })
);

app.post("/apia/uploadfile", imageUpload.any(), (req, res, next) => {
  console.log("resqqqqq", req.files);
  const file = req.files;
  if (!file && file.length > 0) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(req.files);
});

app.post("/apim/uploadfile", imageUpload.any(), (req, res, next) => {
  console.log("reqqqq", req, "resqqqqq");
  const file = req.files[0];
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

// Document Uploads
var documentStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    var filePath = path.resolve(__dirname, "uploads/documents");
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    cb(null, filePath);
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var documentUpload = multer({ storage: documentStorage });

app.post("/docUpload", documentUpload.any(), (req, res, next) => {
  console.log("reqqqq", req, "resqqqqq");
  const file = req.files;
  if (!file && file.length > 0) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

var upload = multer({
	storage: multer.diskStorage({

		destination: function (req, file, callback) { callback(null, path.join(__dirname + './../public/uploads')); },
		filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

	}),

	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname)
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback(/*res.end('Only images are allowed')*/ null, false)
		}
		callback(null, true)
	}
});

app.post('/apim/imageUpload', upload.any(), function (req, res) {
  var files = req.files
  var postData = req.body
  var finalData = []
  if (!req.body && !req.files) {
    		res.send({ status: "failed", msg: 'please upload file' });
    	} else {
        files.forEach(item=>{finalData.push(item.filename)})
      var final = {
        imageCategoryId:postData.imageCategoryId,
        uploadDate: postData.uploadDate,
        imagePath: finalData
      }
      api.makeServiceCall("POST", "mobile", "/petdetails/imageUpload",final)
			.then(response => {
				console.log('=====================>>>>>>>>>>>>>>>>response',response.data)
				res.send(response.data); // <= send data to the client
			})
			.catch(err => {
				console.log(err.response.status);
				res.status(err.response.status).json(err.response.data);
      });
    	}  
})

// Loading Routes
app.use("/", routes);

module.exports = app;
