function WithdrawalModel(RequestService) {
	return {
		toWithdrawal: toWithdrawal
	};

	function toWithdrawal(Data, success, fail) {
		return RequestService
			.post('withdrawal/to-withdrawal', Data, success, fail);
	}
}

WithdrawalModel.$inject = ['RequestService'];

export default WithdrawalModel;