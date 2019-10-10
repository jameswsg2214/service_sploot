const babel = require("babel-polyfill");
const config = require("./src/config/config");
const app = require("./src/app");

const Promise = require("bluebird"); // eslint-disable-line no-global-assign

var server = require("http").createServer(app);

if (!module.parent) {
	// listen on port config.port
	server.listen(config.port, () => {
		console.info(`server started on port ${config.port} (${config.env})`);
	});
	server.on("error", onError);
	server.on("listening", onListening);
}

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	var bind = typeof config.port === "string" ? "Pipe " + config.port : "Port " + config.port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	console.log("Listening on " + bind);
}

module.exports = app;
