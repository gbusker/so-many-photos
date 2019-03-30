const mongoose = require('../services/mongoose');

var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  path: { type: String, unique: true, required: true },
  sha256: String,
  filesize: Number,
  exif: String,
  thumbnails: [{dimensions: String, path: String}]
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
