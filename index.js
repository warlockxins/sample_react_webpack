var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('*', function(req, res) {
  if (req.originalUrl.indexOf("/bin/") > -1) {
    res.sendFile(path.join(__dirname + req.originalUrl));
  }
});

app.listen(8080);

console.log("your page is on localhost:8080/");
