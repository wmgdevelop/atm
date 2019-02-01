const Config = require('./config');
const DBService = require('./services/db.service');
const RouteService = require('./services/route.service');
const LogService = require('./services/log.service');
const DepositRoute = require('./modules/deposit/deposit.route');
const WithdrawalRoute = require('./modules/withdrawal/withdrawal.route');
const app = RouteService.start();

DBService.start(Config, successStartDB, failStartDB);

module.exports = app;

function successStartDB() {
	LogService.success(`Database start successfully`);
	RouteService.listen(Config, successListenRoute);

	function successListenRoute(Route) {
		LogService.success(`Server listen successfully in the port ${Config.Server.port}`);
		DepositRoute(Route);
		WithdrawalRoute(Route);
	}
}

function failStartDB(FailResponse) {
	console.error(`There was an error when start database`, FailResponse);
}