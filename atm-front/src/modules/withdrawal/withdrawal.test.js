import angular from 'angular';
import 'angular-mocks';
import '../../app';
import Config from '../../config';

let scope, _WithdrawalModel, httpBackend, controller;

describe('WithdrawalController', () => {
	beforeEach(angular.mock.module('atm'));

	beforeEach(inject(($rootScope, WithdrawalModel, $httpBackend, $controller, $window) => {
		scope = $rootScope.$new();
		_WithdrawalModel = WithdrawalModel;
		httpBackend = $httpBackend;
		controller = $controller;

		httpBackend.expectGET('modules/deposit/deposit.view.html').respond(200);
	}));

	afterEach(() => {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('it should to load withdrawal controller', () => {
		controller('WithdrawalController', {
			$scope: scope,
			WithdrawalModel: _WithdrawalModel
		});
		httpBackend.flush();
	});


	it('it should to send a withdrawal to api', () => {
		let value = 100;
		controller('WithdrawalController', {
			$scope: scope,
			WithdrawalModel: _WithdrawalModel
		});
		httpBackend.flush();
		httpBackend.expectPOST(`${Config.Api.domain}/withdrawal/to-withdrawal`)
			.respond(200, {
				successfully: true,
				Response: {}
			});
		scope.value = value;
		scope.toWithdrawal();
		httpBackend.flush();
	});
});