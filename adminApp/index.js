// const babel = require("babel-polyfill");
const config = require("./src/config/config");
const app = require("./src/config/express");
/* eslint-disable no-unused-vars */
const db = require("./src/config/sequelize");

var server = require('http').createServer(app);

if (!module.parent) {
    server.listen(config.port, () => {
        console.info(`server started on port ${config.port}(${config.env})`)
    })
}