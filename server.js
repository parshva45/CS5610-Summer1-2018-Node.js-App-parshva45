var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer1-2018-lectures');

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/', function (req, res) {
  res.send('Node.js app deployed successfully!')
});

var session = require('express-session')
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'any string'
}));

require('./services/user.service.server')(app);
require('./services/section.service.server')(app);
require('./services/enrollment.service.server')(app);

app.listen(process.env.PORT || 4000);