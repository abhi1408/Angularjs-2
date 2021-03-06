const express = require('express');
const router = express.Router();


//var csrf = require('csurf');
//csrfProtection = csrf();

/*
* User Routes
*/
const categoryRoutes = require('./api/category');
router.use('/category', categoryRoutes); 

/*
* Product Routes
*/
const productRoutes = require('./api/product');
router.use('/product', productRoutes);  


/*
* User Routes
*/
const userRoutes = require('./api/user');
router.use('/user', userRoutes); 

module.exports = router;