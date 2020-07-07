// load the things we need
var express = require('express');
var server = express();
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./routes/routeServer')
const mongoose = require('mongoose')
const formData = require('form-data');

server.use('/css', express.static('public/css'));
server.use('/js', express.static('public/js'));
server.use('/img', express.static('public/img'));
server.use('/fonts', express.static('public/fonts'));
server.use('/img', express.static('public/img'));
// set the view engine to ejs
server.set('view engine', 'ejs');



//Passport
server.use(expressSession({
    isLogin: false,
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
}))
server.use(express.json()) // for parsing application/json
// server.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

server.use(passport.initialize());
server.use(passport.session());

// routes(server)
server.use('/', routes)

server.listen(8080);
console.log('server run in port 8080');

mongoose.connect('mongodb://localhost:2x7017/ShoppingDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Connect database successfully!')
        }
    })