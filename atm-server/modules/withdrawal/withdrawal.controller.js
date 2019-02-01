const TransactionModel = require('../../models/transaction/transaction.model');

module.exports = {
	toWithdrawal
};

function toWithdrawal(Data, success, fail) {
	if (typeof Data !== 'object') {
		return fail('WITHDRAWAL_TO_WITHDRAWAL_DATA_INVALID');
	}
	if (typeof Data.value !== 'number') {
		return fail('WITHDRAWAL_TO_WITHDRAWAL_VALUE_INVALID');
	}
	if (Data.value <= 2) {
		return fail('WITHDRAWAL_TO_WITHDRAWAL_VALUE_SHORT');
	}
	if (Math.floor(Data.value) !== Data.value) {
		return fail('WITHDRAWAL_TO_WITHDRAWAL_VALUE_IS_INTEGER');
	}
	let MoneyNotes = [{
		_id: 100,
		quantity: null
	}, {
		_id: 50,
		quantity: null
	}, {
		_id: 20,
		quantity: null
	}, {
		_id: 10,
		quantity: null
	}];
	let MoneyNotesAndQuantity = {
		MoneyNotes: [],
		remaining: Data.value
	};
	let PipelinesNewMoneyNotes = [{
		$unwind: '$MoneyNotes'
	}, {
		$match: {
			$or: [{
				'MoneyNotes.value': 2
			}, {
				'MoneyNotes.value': 5
			}]
		}
	}, {
		$group: {
			_id: '$MoneyNotes.value',
			quantity: {
				$sum: {
					$cond: [
						'$isDeposit',
						'$MoneyNotes.quantity',
						{
							$multiply: ['$MoneyNotes.quantity', -1]
						}
					]
				}
			}
		}
	}, {
		$sort: {
			_id: -1
		}
	}];

	TransactionModel.aggregate(PipelinesNewMoneyNotes, aggregateNewMoneyNotes);

	function aggregateNewMoneyNotes(FailAggregateNewMoneyNotes, SuccessAggregateNewMoneyNotes) {
		if (FailAggregateNewMoneyNotes) {
			return fail(FailAggregateNewMoneyNotes)
		}

		MoneyNotes = MoneyNotes.concat(SuccessAggregateNewMoneyNotes);
		MoneyNotesAndQuantity = findMoneyNotesAndQuantity(MoneyNotes, MoneyNotesAndQuantity);


		if (MoneyNotesAndQuantity.remaining !== 0) {
			return fail('WITHDRAWAL_TO_WITHDRAWAL_THERE_ARE_NO_NOTES_FOR_VALUE');
		}

		let NewTransaction = new TransactionModel();

		NewTransaction.total = -Data.value;
		NewTransaction.isDeposit = false;
		NewTransaction.datetime = new Date();
		NewTransaction.MoneyNotes = MoneyNotesAndQuantity.MoneyNotes;

		NewTransaction.save(saveTransation);

		function saveTransation(FailResponse, SuccessResponse) {
			if (FailResponse) {
				return fail('WITHDRAWAL_TO_WITHDRAWAL_ERROR_TO_SAVE_TRANSACTION');
			}

			success(SuccessResponse);
		}
	}

	function findMoneyNotesAndQuantity(NewMoneyNotes, NewMoneyNotesAndQuantity) {
		let remaining = NewMoneyNotesAndQuantity.remaining;

		if (!remaining || !NewMoneyNotes || !NewMoneyNotes.length) {
			return NewMoneyNotesAndQuantity;
		}

		let NewMoneyNoteAndQuantity = {};
		let quantityMoneyNote;
		let NewMoneyNote = NewMoneyNotes.shift();
		let valueMoneyNote = NewMoneyNote._id;

		if (remaining >= valueMoneyNote && (valueMoneyNote !== 5 || remaining % 5 === 0 || remaining % 10 === 7)) {
			quantityMoneyNote = Math.floor(remaining / valueMoneyNote);
			NewMoneyNoteAndQuantity.quantity =
				NewMoneyNote.quantity === null ? quantityMoneyNote:
				quantityMoneyNote > NewMoneyNote.quantity ?
				NewMoneyNote.quantity : quantityMoneyNote;

			if (NewMoneyNoteAndQuantity.quantity >= 1) {
				NewMoneyNoteAndQuantity.value = valueMoneyNote;
				NewMoneyNotesAndQuantity.MoneyNotes.push(NewMoneyNoteAndQuantity);
				NewMoneyNotesAndQuantity.remaining -= NewMoneyNoteAndQuantity.quantity * valueMoneyNote;
			}
		}

		return findMoneyNotesAndQuantity(NewMoneyNotes, NewMoneyNotesAndQuantity);
	}
}