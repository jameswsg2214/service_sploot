var mongoose = require('mongoose');
// var DateOnly = require('mongoose-dateonly')(mongoose);
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

//configuration table Schema
var TblImageUploadSchema = Schema({
    imageId: { type: String },
    userID: { type: String },
    imageCategoryId: { type: Number },
    imagePath: [Array],
    uploadDate: Date
}, { collection: 'TblImageUpload' });

autoIncrement.initialize(mongoose.connection);
TblImageUploadSchema.plugin(autoIncrement.plugin, {
    model: 'TblImageUpload',
    field: 'imageId',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('TblImageUpload', TblImageUploadSchema);