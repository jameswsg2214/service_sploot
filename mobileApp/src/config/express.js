const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const httpStatus = require("http-status");
const expressWinston = require("express-winston");
const expressValidation = require("express-validation");
const helmet = require("helmet");
const multer = require("multer");
const winstonInstance = require("./winston");
const routes = require("../routes/index.route");
const config = require("./config");
const APIError = require("../helpers/APIError");
const db = require("./sequelize");
const ImageUpload = db.TblImageUpload;
const app = express();

if (config.env === "development") {
	app.use(logger("dev"));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//image storage

var upload = multer({
	storage: multer.diskStorage({

		destination: function (req, file, callback) { callback(null, path.join(__dirname + './../../public/uploads')); },
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
// enable detailed API logging in dev env
if (config.env === "development") {
	expressWinston.requestWhitelist.push("body");
	expressWinston.responseWhitelist.push("body");
	app.use(
		expressWinston.logger({
			winstonInstance,
			meta: true, // optional: log meta data about request (defaults to true)
			msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
			colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
		})
	);
}

app.use("/assets", express.static(path.join(__dirname, "../uploads")));

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
	if (err instanceof expressValidation.ValidationError) {
		// validation error contains errors which is an array of error each containing message[]
		const unifiedErrorMessage = err.errors.map(error => error.messages.join(". ")).join(" and ");
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


//Image upload
app.post('/apim/imageUpload', upload.any(), function (req, res) {
	const postData = req.body
	const postFiles = req.files
	let arr = []
	postFiles.forEach((item) => {
		arr.push(item.filename)
	})
	if (!req.body && !req.files) {
		res.send({ status: "failed", msg: 'please provide input data' });
	} else {
		ImageUpload.create({
			imageCategoryId: postData.imageCategoryId,
			uploadDate: postData.uploadDate,
			imagePath: arr
		}).then((data) => {
			res.send({ status: 'success', msg: 'Image uploaded successfully' })
		}).catch(err => {
			res.send({ status: 'failed', msg: 'failed to upload images' })
		})
	}
});

// mount all routes on /api path
app.use("/", routes);

module.exports = app;
// all good