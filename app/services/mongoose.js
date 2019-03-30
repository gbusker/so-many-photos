const mongoose = require('mongoose');
const config = require('../../config');

var URI = config.mongo_url;

mongoose.connect(URI, {useNewUrlParser: true});


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
