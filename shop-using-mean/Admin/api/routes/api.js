var express = require('express');
var router = express.Router();
var productModel = require('../models/product.js');

//get all products
router.get('/products', function(request, response, next){
	productModel.find({}, function(err, resources){
		if(err){
			response.send(err).status(404);
		}
		response.send(resources).status(200);
	});
});

//get single product
router.get('/product/:id', function(request, response, next){
	
});

//add product
router.post('/product', function(request, response, next){
	var product = new productModel(request.body);
	product.save(function(err, resource){
		if(err){
			response.send(err).status(500);
		}
		response.json(resource).status(200);
	});
});



module.exports = router;