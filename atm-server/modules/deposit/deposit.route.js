module.exports = (Route) => {
	const DepositController = require('./deposit.controller');

	Route.post('/deposit/to-deposit', DepositController.toDeposit);
};