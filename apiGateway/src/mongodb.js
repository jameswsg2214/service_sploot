var mongoose    = require('mongoose');
var config = require('./config/config');
mongoose.set('debug', true);

module.exports = {
    connect: function(done) {
        // var mongooseUrl = config.mongoURL;
        // console.log('Connecting to MongoDB --- ',mongooseUrl);
        // var mongooseOptions = 'maxPoolSize=5&minPoolSize=5&socketTimeoutMS=2000&readPreference=nearest&readConcern=majority&maxStalenessSeconds=90';
        // mongooseUrl = mongooseUrl + '?' + mongooseOptions;

        // mongoose.connect(mongooseUrl, {
        //     user: config.dbUser,
        //     pass: config.dbPass
        // }, function(err) {
        //     if (err) {
        //         console.log(err);
        //         return done(err);
        //     } else {
        //         console.log('Connected to MongoDB');

        //         mongoose.connection.on('error', function(err) {
        //             console.log(err);
        //         });
        //         mongoose.connection.on('disconnected', function () {  
        //             console.log('Mongoose default connection disconnected'); 
        //         });

        //         process.on('SIGINT', function() {  
        //             mongoose.connection.close(function () { 
        //                 console.log('Mongoose default connection disconnected through app termination'); 
        //                 process.exit(0); 
        //             }); 
        //         });
        //     }
        // });
        // done();
    },
    getreadystate: function(done) {
        done(mongoose.STATES[mongoose.connection.readyState]);
    }
};