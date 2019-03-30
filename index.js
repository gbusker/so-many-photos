const express = require('express');
const app = express();

var PORT = process.env.PORT || 3000;

const config = require('./config');

app.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
