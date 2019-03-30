const config = require('../config');
const path = require('path');
const glob = require('glob');
const colors = require('colors');
const sha256file = require('sha256-file')

const mongoose = require('../app/services/mongoose');
const Photo = require('../app/models/photo');



scan_dir();

function scan_dir() {
  process.chdir(config.photodir);
  glob('**/*.jpg', (er, files) => {
    if ( er ) { throw(er)};
    files.forEach((el) => {
        find_or_insert(path.relative(config.photodir, el));
    })
  })
}

async function find_or_insert(file) {
  find(file)
    .then((photo) => {
      if( !photo ) {
        process_photo(file);
      }
    })
    .catch(err => {
      console.log('Oops in find: ' + err);
    })
}

async function find(path) {
    var query = Photo.findOne( {path: path});
    return await query.exec();
}

function process_photo(path) {
  photo = new Photo({
    path: path,
    sha256: sha256file(path)
  });
  photo.save((err) => {
    if (err) console.log(err);
  });
}
