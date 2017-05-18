var PORT = 8000 || process.env.PORT;
var DB = "mongodb://localhost/shopping-cart";

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var busboy = require('connect-busboy');
//var session = require('express-session');

var mainRouter = require('./routes/index');
var apiRouter = require('./routes/api');

//set environment


var app = express();

app.use(morgan('dev'));

//allow cross origin access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT, OPTIONS, TRACE");
  next();
});

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname, 'api')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy()); 

//create routes
app.use('/', mainRouter);
app.use('/api', apiRouter);



mongoose.connect(DB, function(err){
	if(err){
		return err;
	}
	console.log('Successfully connected to ' + DB);
});



app.listen(PORT, function(){
	console.log('listening on port ' + PORT);
});