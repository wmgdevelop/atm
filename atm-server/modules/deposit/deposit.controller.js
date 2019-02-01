const TransactionModel = require('../../models/transaction/transaction.model');

module.exports = {
	toDeposit
};

function toDeposit(Data, success, fail) {
	if (typeof Data !== 'object') {
		return fail('DEPOSIT_TO_DEPOSIT_DATA_INVALID');
	}
	if (!Array.isArray(Data.MoneyNotes)) {
		return fail('DEPOSIT_TO_DEPOSIT_MONEY_NOTES_INVALID');
	}
	if (!Data.MoneyNotes.length) {
		return fail('DEPOSIT_TO_DEPOSIT_MONEY_NOTES_SHORT');
	}

	let validateMoneyNotes = Data.MoneyNotes.reduce(reduceMoneyNotesToValidate, true);

	if (!validateMoneyNotes) {
		return fail('DEPOSIT_TO_DEPOSIT_MONEY_NOTES_INVALID');
	}

	let NewTransaction = new TransactionModel();

	NewTransaction.total = 0;
	NewTransaction.isDeposit = true;
	NewTransaction.datetime = new Date();
	NewTransaction.MoneyNotes = [];
	NewTransaction = Data.MoneyNotes.reduce(reduceMoneyNotesToAdd, NewTransaction);

	NewTransaction.save(saveTransation);

	function saveTransation(FailResponse, SuccessResponse) {
		if (FailResponse) {
			return fail('DEPOSIT_TO_DEPOSIT_ERROR_TO_SAVE_TRANSACTION');
		}

		success(SuccessResponse);
	}

	function reduceMoneyNotesToValidate(newValidateMoneyNotes, MoneyNote) {
		if (!newValidateMoneyNotes) {
			return false;
		}
		if (typeof MoneyNote !== 'object') {
			return false;
		}
		if (typeof MoneyNote.value !== 'number') {
			return false;
		}
		if ([2, 5, 10, 20, 50, 100].indexOf(MoneyNote.value) === -1) {
			return false;
		}
		if (typeof MoneyNote.quantity !== 'number') {
			return false;
		}
		if (MoneyNote.quantity < 1) {
			return false;
		}
		return Math.floor(MoneyNote.quantity) === MoneyNote.quantity;
	}

	function reduceMoneyNotesToAdd(NewTransactionReduced, MoneyNote) {
		let NewMoneyNote = {};

		NewMoneyNote.quantity = MoneyNote.quantity;
		NewMoneyNote.value = MoneyNote.value;

		NewTransactionReduced.MoneyNotes.push(NewMoneyNote);
		NewTransactionReduced.total = MoneyNote.quantity * MoneyNote.value;

		return NewTransactionReduced;
	}
}