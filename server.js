var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://db:27017/docerDemo";
MongoClient.connect(url, function(err, database) {
  if (err) {
    console.log("failed to connect", err);
    return;
  }
  db = database;
  console.log("connected to server");
});

// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/wwwroot/*', function(req, res) {
  res.sendFile(path.join(__dirname + req.originalUrl));
});

app.get('/addSpoofData', function(req, res) {
  var name = 'usr' + Math.floor(Math.random()*1000);
  var mail = name + "@gmail.com";
  var collection = db.collection('users');
  var doc = {
    name: name,
    mail: mail,
    createdAt: new Date()
  };

  collection.insert(doc, {w:1}, function(err, result) {
    console.log("data added:", result);
    res.send(result);
  });
});

app.get('/getSpoofData', function(req, res) {
  var collection = db.collection('users')
  .find().toArray(function(err, docs) {
    console.log('found data:', docs)
    res.send(docs);
  });
});


app.listen(8080);

console.log("Your page is here: localhost:8080/");
