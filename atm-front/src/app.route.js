function AppRoute($routeProvider) {
	$routeProvider
		.when('/saque', {
			templateUrl: 'modules/withdrawal/withdrawal.view.html',
			controller: 'WithdrawalController'
		})
		.when('/deposito', {
			templateUrl: 'modules/deposit/deposit.view.html',
			controller: 'DepositController'
		})
		.otherwise({
			redirectTo: '/deposito'
		});
}

AppRoute.$inject = ['$routeProvider'];

export default AppRoute;