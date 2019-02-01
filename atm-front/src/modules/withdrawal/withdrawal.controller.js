function WithdrawalController($scope, WithdrawalModel, AlertService) {
	$scope.MoneyNotes = [];
	$scope.goToDeposit = function () {
		location.assign('#!/deposito');
	};
	$scope.toWithdrawal = function () {
		if ($scope.value < 2) {
			return AlertService.error('O valor deve ser pelo menos 2 reais');
		}

		let Data = {
			value: $scope.value
		};

		WithdrawalModel
			.toWithdrawal(Data, successToWithdrawal, failToWithdrawal);

		function successToWithdrawal(SuccessResponseWithdrawal) {
			$scope.MoneyNotes = SuccessResponseWithdrawal.MoneyNotes;
			AlertService.success(`Saque de R$ ${$scope.value},00 realizado com sucesso`);
			$scope.value = '';
		}

		function failToWithdrawal(FailResponse) {
			if (FailResponse === 'WITHDRAWAL_TO_WITHDRAWAL_VALUE_INVALID') {
				return AlertService.error('Você deve informar um valor válido');
			}
			if (FailResponse === 'WITHDRAWAL_TO_WITHDRAWAL_VALUE_SHORT') {
				return AlertService.error('O valor deve ser pelo menos 2 reais');
			}
			if (FailResponse === 'WITHDRAWAL_TO_WITHDRAWAL_VALUE_IS_INTEGER') {
				return AlertService.error('Você deve informar um valor inteiro');
			}
			if (FailResponse === 'WITHDRAWAL_TO_WITHDRAWAL_THERE_ARE_NO_NOTES_FOR_VALUE') {
				return AlertService.error('Não há notas disponíveis para este valor');
			}

			AlertService.error('Ocorreu um erro ao realizar o saque');
		}
	};
}

WithdrawalController.$inject = ['$scope', 'WithdrawalModel', 'AlertService'];

export default WithdrawalController;