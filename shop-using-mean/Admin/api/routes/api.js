const express = require('express');
const router = express.Router();


//var csrf = require('csurf');
//csrfProtection = csrf();

/*
* Product Routes
*/
const productRoutes = require('./api/product');
router.use('/product', productRoutes);  


/*
* User Routes
*/
const userRoutes = require('./api/user');
router.use('/user', productRoutes); 

module.exports = router;