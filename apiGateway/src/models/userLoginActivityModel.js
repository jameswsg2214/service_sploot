var mongoose  = require('mongoose');
var Schema  =   mongoose.Schema;

//configuration table Schema
var userLoginActivitySchema = mongoose.Schema({
    userID: { type: String },
    userName: { type: String },
    hostName: { type: String},
    APIName: { type: String },
    IPAddress: { type: String },
    deviceID: { type: String },
    deviceName: { type: String },
    deviceVersion: { type: String },
    deviceOS: { type: String },
    Tocken: { type: String },
    Status: { type: String },
    request: { type: String }, 
    response: { type: String },
    LoginDate: { type: Number },
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    isDeleted: {type: Boolean , default : false}
},{ collection: 'user_activity_tbl' });

module.exports = mongoose.model('user_activity_tbl', userLoginActivitySchema);