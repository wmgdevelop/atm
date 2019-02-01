module.exports = {
	MoneyNotes: [{
		value: {
			type: Number,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		}
	}],
	isDeposit: {
		type: Boolean,
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	datetime: {
		type: Date,
		required: true
	}
};