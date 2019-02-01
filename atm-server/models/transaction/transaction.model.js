const mongoose = require('mongoose');
const TransactionSchemaObject = require('./transaction.schema');
const TransactionSchemaOptions = {
	versionKey: false
};
const TransactionSchema = mongoose.Schema(TransactionSchemaObject, TransactionSchemaOptions);

module.exports = mongoose.model('Transaction', TransactionSchema, 'Transaction');