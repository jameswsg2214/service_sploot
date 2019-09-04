const axios = require("axios");
const ENDPOINTS = require("../config/gateway");
const config = require("../config/config");
const logsModel = require("../models/logsModel");
const userLoginActivityModel = require("../models/userLoginActivityModel");

axios.interceptors.request.use(
	function (req_data) {
		req_data.headers.Authorization = config.jwtSecret;

        return req_data;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

console.log(ENDPOINTS);
const apiService = () => {
	const makeServiceCall = (method, name, end_points, payload, headers) => {
        console.log('===========================',method, name, end_points, payload, headers)
        var base_url = _constructURL(name, end_points);
        var reqTime = new Date().getTime();
		return axios({
			method: method,
			url: base_url,
			data: payload
		}).then(response => {
            console.log("==============>>>>>===========",response)
            console.log("==============>>>>>===========",headers['user-id'])
            try {
                if (headers) {
                    var userLogActivityObj = {
                        userID: headers['user-id'],
                        userName: headers['user-name'],
                        hostName: headers['host-name'],
                        APIName: end_points,
                        IPAddress: headers['ip-address'],
                        deviceID: headers['device-id'],
                        deviceName: headers['device-name'],
                        deviceVersion: headers['device-version'],
                        deviceOS: headers['device-os'],
                        Token: headers['x-access-token'],
                        Status: response.status,
                        request: response.data.req,
                        response: response.data.status,
                        LoginDate: headers['login-date']
                    };
                    var logObj = JSON.parse(JSON.stringify(userLogActivityObj));
                    console.log("logObj==============>>>>>>>>",logObj)
                    logObj.errorResponse = null;
                    logObj.LogLevel = 'info';
                    logObj.APIRequestTime = reqTime;
                    logObj.APIResponseTime = new Date();
                    logsModel.create(logObj, (err, data) => {
                        if (err) console.log("Error in creating user log:", err);
                        else console.log('data inserted successfully user_logs_tbl')
                    });
                    userLoginActivityModel.create(userLogActivityObj, (err, data) => {
                        if (err) console.log("Error in creating user log activity:", err);
                        else console.log('data inserted successfully in user_activity_tbl')
                    });
                }
            } catch (error) {
                console.log("**********ERROR", error);
            }            
            return response;
        }).catch(err => {
            console.log("error:",err);
            return err;
        });
	};

	const _constructURL = (name, end_points) => {
		var serviceName = ENDPOINTS[name];

		return serviceName.url + end_points;
    };
    
    // name: survey, endpoints:  /survey/getsurveyList

	return {
		_constructURL,
		makeServiceCall
	};
};

module.exports = apiService();
