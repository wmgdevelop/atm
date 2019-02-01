module.exports = (Route) => {
	const WithdrawalController = require('./withdrawal.controller');

	Route.post('/withdrawal/to-withdrawal', WithdrawalController.toWithdrawal);
};