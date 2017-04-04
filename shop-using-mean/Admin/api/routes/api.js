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
	var id = request.params.id;
	productModel.findOne({ _id: id }, function(err, resources){
		if(err){
			response.send(err).status(404);
		}
		response.send(resources).status(200);
	});
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

//update product
router.put('/product/:id', function(request, response, next){
	var id = request.params.id;
	productModel.update({ _id: id }, request.body, { multi: true }, function(err, resource){
		if(err){
			response.send(err).status(500);
		}
		response.json(resource).status(200);
	});
});

//delete product
router.delete('/product/:id', function(request, response, next){
	var id = request.params.id;
	productModel.remove({ _id: id }, function(err, resource){
		if(err){
			response.send(err).status(500);
		}
		response.json(resource).status(200);
	});
});

module.exports = router;