var express = require('express');
var router = express.Router();
var fs = require('fs');
var productModel = require('../models/product.js');

//var csrf = require('csurf');
//csrfProtection = csrf();

/*
* Product Routes
*/

//get all products
router.get('/products', function(request, response, next){
	productModel.find({}, function(err, docs){
		if(err){
			response.send(err).status(404);
		}
		response.send(docs).status(200);
	});
});

//get single product
router.get('/product/:id', function(request, response, next){
	var id = request.params.id;
	productModel.findOne({ _id: id }, function(err, docs){
		if(err){
			response.send(err).status(404);
		}
		response.send(docs).status(200);
	});
});

//add product
router.post('/product', function(request, response, next){
	var product = new productModel(request.body);
	
	product.save(function(err, docs){
		if(err){
			response.send(err).status(500);
		}
		response.json(docs).status(200);
	});
});

//update product
router.put('/product/:id', function(request, response, next){
	var id = request.params.id;
	productModel.update({ _id: id }, request.body, { multi: true }, function(err, docs){
		if(err){
			response.send(err).status(500);
		}
		response.json(docs).status(200);
	});
});

//delete product
router.delete('/product/:id', function(request, response, next){
	var id = request.params.id;
	productModel.remove({ _id: id }, function(err, docs){
		if(err){
			response.send(err).status(500);
		}
		response.json(docs).status(200);
	});
});

//product image upload
router.post('/product/upload', function(req, response, next){	
	var fstream;
	if (req.busboy) {
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
	        console.log("Uploading: " + filename, __dirname); 
	        fstream = fs.createWriteStream(__dirname + '/' + filename);
	        file.pipe(fstream);
	        fstream.on('close', function () {
	            response.send('File uploaded successfully').status(200);
	        });
	    });
	}
    response.send('Error in file uploading').status(200);
});

/*
* User Routes
*/
router.get('user/signup', function(req, res, next){

});

module.exports = router;