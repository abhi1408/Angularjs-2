var express = require('express');
var router = express.Router();
const categoryModel = require('../../models/category.js');


//get all category
router.get('/', function(request, response, next){
	categoryModel.find({}, function(err, docs){
		if(err){
			response.send(err).status(404);
		}
		response.send(docs).status(200);
	});
});

//get single category
router.get('/:id', function(request, response, next){
	var id = request.params.id;
	categoryModel.findOne({ _id: id }, function(err, docs){
		if(err){
			response.send(err).status(404);
		}
		response.send(docs).status(200);
	});
});

//add category
router.post('/', function(request, response, next){
	let newCategory = new categoryModel({
		name: request.body.name,
		parent: request.body.parent,
		status: request.body.status
	});

	newCategory.save(function(err, docs){
		if(err){
			response.send(err).status(500);
		}
		response.json(docs).status(200);
	});
});

//update category
router.put('/:id', function(request, response, next){
	var id = request.params.id;
	categoryModel.update({ _id: id }, request.body, { multi: true }, function(err, docs){
		if(err){
			response.send(err).status(500);
		}
		response.json(docs).status(200);
	});
});

//delete category
router.delete('/:id', function(request, response, next){
	var id = request.params.id;
	categoryModel.remove({ _id: id }, function(err, docs){
		if(err){
			response.send(err).status(500);
		}
		response.json(docs).status(200);
	});
});

module.exports = router;