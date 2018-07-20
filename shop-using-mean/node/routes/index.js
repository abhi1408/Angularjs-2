var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.send('Index page route called...');
	//res.render('index.html', { title: 'Shopping Cart'});
});

module.exports = router;