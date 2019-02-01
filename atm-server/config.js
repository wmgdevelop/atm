module.exports = {
	DB: {
		url: process.env.DB_URL || `mongodb://localhost:27017/atm`
	},
	Server: {
		port: process.env.PORT || 3000,
	}
};