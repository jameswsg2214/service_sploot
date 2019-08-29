var mongoose  = require('mongoose');
var Schema  =   mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

//configuration table Schema
var userLogsSchema = mongoose.Schema({
    userID: { type: String },
    userName: { type: String },
    hostName: { type: String},
    IPAddress: { type: String },
    deviceID: { type: String },
    deviceName: { type: String },
    deviceVersion: { type: String },
    deviceOS: { type: String },
    Token: { type: String },
    Status: { type: String },
    request: { type: Object }, 
    response: { type: String },
    errorResponse: { type: String },
    LogLevel: { type: String },
    APIName: { type: String },
    APISequenceNo: { type: String },
    APIRequestTime: { type: Number },
    APIResponseTime: { type: Number },
    LoginDate: { type: Number },
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    isDeleted: {type: Boolean , default : false}
},{ collection: 'user_logs_tbl' });

autoIncrement.initialize(mongoose.connection);
userLogsSchema.plugin(autoIncrement.plugin, {   
    model: 'user_logs_tbl',
    field: 'APISequenceNo',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('user_logs_tbl', userLogsSchema);