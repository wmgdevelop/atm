import AlertService from "../../services/alert.service";

function DepositController($scope, DepositModel, AlertService) {
	$scope.MoneyNotes = [{
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
	}];

	$scope.goToWithdraw = function () {
		location.assign('#!/saque');
	};

	$scope.toDeposit = function () {
		let Data = {
			MoneyNotes: $scope.MoneyNotes.reduce(reduceMoneyNotes, [])
		};

		if (!Data.MoneyNotes.length) {
			return AlertService.error('Pelo menos uma das notas deve possuir quantidade');
		}

		DepositModel
			.toDeposit(Data, successToDeposit, failToDeposit);

		function reduceMoneyNotes(NewMoneyNotes, MoneyNote) {
			let NewMoneyNote = {};

			if (MoneyNote.quantity < 1) {
				return NewMoneyNotes;
			}

			NewMoneyNote.quantity = MoneyNote.quantity;
			NewMoneyNote.value = MoneyNote.value;

			NewMoneyNotes.push(NewMoneyNote);

			return NewMoneyNotes
		}

		function successToDeposit() {
			AlertService.success('Depósito realizado com sucesso');
			$scope.MoneyNotes = [{
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
			}];
		}

		function failToDeposit() {
			AlertService.error('Ocorreu um erro ao realizar o depósito');
		}
	};
}

DepositController.$inject = ['$scope', 'DepositModel', 'AlertService'];

export default DepositController;