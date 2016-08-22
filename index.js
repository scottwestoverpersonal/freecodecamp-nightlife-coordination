var express = require('express');
var Yelp = require('yelp');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var stormpath = require('express-stormpath');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/yelp', function(request, response) {
    yelp.search({ term: 'bar', location: request.query.loc })
  .then(function (data) {
    response.json(data);
  })
  .catch(function (err) {
    response.json(data);
  });
});

app.on('stormpath.ready', function() {
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
});


//  https://aqueous-hollows-27026.herokuapp.com/
//  https://nodejs-fcc-scottwestover.c9users.io/