import angular from 'angular';
import 'angular-mocks';
import '../../app';
import Config from '../../config';

let scope, _DepositModel, httpBackend, controller;

describe('DepositController', () => {
	beforeEach(angular.mock.module('atm'));

	beforeEach(inject(($rootScope, DepositModel, $httpBackend, $controller) => {
		scope = $rootScope.$new();
		_DepositModel = DepositModel;
		httpBackend = $httpBackend;
		controller = $controller;

		httpBackend.expectGET('modules/deposit/deposit.view.html').respond(200);
	}));

	afterEach(() => {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('it should to load deposit controller', () => {
		controller('DepositController', {
			$scope: scope,
			DepositModel: _DepositModel
		});
		httpBackend.flush();
		expect(scope.MoneyNotes).toEqual([{
			value: 2,
			quantity: 0
		}, {
			value: 5,
			quantity: 0
		}, {
			value: 10,
			quantity: 0
		}, {
			value: 20,
			quantity: 0
		}, {
			value: 50,
			quantity: 0
		}, {
			value: 100,
			quantity: 0
		}]);
	});

	it('it should to send a deposit to api', () => {
		let MoneyNotes = [{
			value: 2,
			quantity: 0
		}, {
			value: 5,
			quantity: 0
		}, {
			value: 10,
			quantity: 2
		}, {
			value: 20,
			quantity: 0
		}, {
			value: 50,
			quantity: 0
		}, {
			value: 100,
			quantity: 0
		}];
		controller('DepositController', {
			$scope: scope,
			DepositModel: _DepositModel
		});
		httpBackend.flush();
		httpBackend.expectPOST(`${Config.Api.domain}/deposit/to-deposit`)
			.respond(200, {
				successfully: true,
				Response: {}
			});
		scope.MoneyNotes = MoneyNotes;
		scope.toDeposit();
		httpBackend.flush();
	});
});