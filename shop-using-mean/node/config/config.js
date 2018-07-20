module.exports = {
	port: 8000 || process.env.PORT,
	database: "mongodb://localhost:27017/shopping-cart",
	secret: "yoursecret",
	tokenExpiresIn: 604800 //1 week
}