// load the things we need
var express = require('express');
var server = express();

server.use('/css',express.static('public/css'));
server.use('/js',express.static('public/js'));
// set the view engine to ejs
server.set('view engine', 'ejs');
// use res.render to load up an ejs view file

// index page 
server.get('/', function(req, res) {
	res.render('pages/index');
});
let routes = require('./routes/routeServer')

// routes(server)
server.use('/', routes)
//Acount
// server.get('/account', function(req, res) {
// 	res.render('account/listaccount');
// });
//Product

server.get('/productType', function(req, res) {
	res.render('product/productType');
});
server.listen(8080);
console.log('8080 is the magic port');