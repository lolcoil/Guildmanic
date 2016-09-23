var express = require('express');
var app = express();
var port = 3000;


app.use(express.static(__dirname.substring(0,__dirname.lastIndexOf(String.fromCharCode(92))+1) + 'client'))
app.listen(port, function () {
  console.log('Webdemon initialized on port ' + port);
});




