var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var busboy = require('connect-busboy');
var cors = require('cors');
//var session = require('express-session');
//var morgan = require('morgan');

const config = require('./config/config.js');

const mainRouter = require('./routes/index');
const apiRouter = require('./routes/api');

//set environment


var app = express();

//app.use(morgan('dev'));

//allow cross origin access
app.use(cors());
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT, OPTIONS, TRACE");
  next();
});*/

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(busboy()); 

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//create routes
app.use('/', mainRouter);
app.use('/api', apiRouter);


//Connect to mongodb
mongoose.connect(config.database);

mongoose.connection.on('connected', function(){
	console.log('Connected to mongodb database: ' + config.database);
});

mongoose.connection.on('error', function(err){
	if(err){
		console.log('Error in mongodb database connection ' + err);
	}
});


app.listen(config.port, function(){
	console.log('Server started on port: ' + config.port);
});