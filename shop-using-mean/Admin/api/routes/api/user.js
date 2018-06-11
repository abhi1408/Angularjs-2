var express = require('express');
var router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const userModel = require('../../models/user');

//Register
router.post('/register', function(request, response, next){
	let newUser = new userModel({
		name: request.body.name,
		email: request.body.email,
		username: request.body.username,
		password: request.body.password
	});

	userModel.addUser(newUser, (err, docs) => {
		if(err){
			response.send(err).status(500);
		}
		response.json(docs).status(200);
	});
});

//Authenticate
router.post('/authenticate', function(request, response, next){
	const username = request.body.username;
	const password = request.body.password;

	userModel.getUserByUsername(username, (err, user) => {
		if(err)
			response.send(err).status(500);

		if(!user){
			//response.send('User not found').status(500);
			response.json({
					success: false,
					message: 'User not found'
				}).status(500);
		}

		userModel.comparePassword(password, user.password, (err, isMatch) => {
			if(err)
				response.send(err).status(500);

			if(isMatch){

				const token = jwt.sign({data: user}, config.secret, { expiresIn: config.tokenExpiresIn });
				
				response.json({
					success: true,
					token: 'JWT '+token,
					user: {
						id: user._id,
						name: user.name,
						usernmae: user.username,
						email: user.email
					}
				}).status(200);
			}else{
				//response.send('Wrong password').status(500);
				response.json({
					success: false,
					message: 'Wrong password'
				}).status(500);
			}
		});
	});
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), function(request, response, next){
	response.json({user: request.user}).status(200);
});

module.exports = router;