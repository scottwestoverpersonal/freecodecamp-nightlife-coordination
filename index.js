var express = require('express');
var Yelp = require('yelp');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var stormpath = require('express-stormpath');
var app = express();

var yelp = new Yelp({
  consumer_key: 'gmnAAe1XgNKeGoRV5knGOw',
  consumer_secret: 'JO-I347HD8VCV3m3c_eDukbbVrE',
  token: 'StKbQj9MfQOR7VsSOEL8xXplcRfDfgj7',
  token_secret: 'z-Wf1BeFvcYb5YxFR2Y_wKcgVvw',
});

var mongoURL = 'mongodb://heroku_tk3dnhh3:jvru6o4r6rhr7kn35oc7l4ksje@ds013456.mlab.com:13456/heroku_tk3dnhh3';

app.use(stormpath.init(app, {
  website: true,
    apiKey: {
      id: '1P3PA4S39F3IL26KBI1R2AWMY', 
      secret: 'Eg2b+h/zGdfvTPf3DaJWlCGSLGDYKs4hyzPj5EWPtNw'
    },
 application: {
   href: 'https://api.stormpath.com/v1/applications/606aCfu9ELSChkl5nH13k0',
 }
}));

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