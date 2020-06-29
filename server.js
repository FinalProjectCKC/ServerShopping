// load the things we need
var express = require('express');
var app = express();

app.use('/css',express.static('public/css'));
app.use('/js',express.static('public/js'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
});

app.listen(8080);
console.log('8080 is the magic port');