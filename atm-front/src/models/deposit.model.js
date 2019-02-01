function DepositModel(RequestService) {
	return {
		toDeposit
	};

	function toDeposit(Data, success, fail) {
		return RequestService
			.post('deposit/to-deposit', Data, success, fail);
	}
}

DepositModel.$inject = ['RequestService'];

export default DepositModel;