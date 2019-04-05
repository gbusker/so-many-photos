const config = require('../config');
const path = require('path');
const glob = require('glob');
const colors = require('colors');
const sha256file = require('sha256-file')

const mongoose = require('../app/services/mongoose');
const Photo = require('../app/models/photo');



scan_dir()
.then(_ => {
  console.log('DONE');
  mongoose.disconnect();
})
.catch( err => {
  console.log(err);
});

async function scan_dir() {
  process.chdir(config.photodir);
  files = glob.sync('**/*.jpg');
  await Promise.all(files.map(async el => {
    console.log(el);
    await find_or_insert(path.relative(config.photodir, el))
  }))
}

async function find_or_insert(file) {

  await find(file).then(async (photo) => {
      if( !photo ) {
        console.log('Save photo');
        await process_photo(file);
      }
      else {
        console.log('Already in DB');
      }
    })
    .catch(err => {
      console.log('Oops in find: ' + err);
    });

}

async function find(path) {
    return await Photo.findOne( {path: path}, function(err, photo) {
      //if (err) return Promise.reject(err);
      return Promise.resolve(photo);
    });
}

async function process_photo(path) {
  photo = new Photo({
    path: path,
    sha256: sha256file(path)
  });
  return await photo.save((err) => {
    //if (err) console.log(err);
  });
}
