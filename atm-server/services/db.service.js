const mongoose = require('mongoose');

module.exports = {
	start
};

function start(Config, success, fail) {
	const OptionsConnect = {
		useNewUrlParser: true
	};

	mongoose.connect(Config.DB.url, OptionsConnect);

	const connection = mongoose.connection;

	connection.once('open', success);
	connection.on('error', fail);
}