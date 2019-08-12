const config = require("./config");

const ENDPOINTS = {
  mobile: {
    url: config.mobileApp
  },
  admin: {
    url: config.adminApp
  }
};

module.exports = ENDPOINTS;
