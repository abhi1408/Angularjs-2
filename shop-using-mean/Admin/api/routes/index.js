var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.send('Index page route called...');
	//res.render('index.html');
});

module.exports = router;