process.env.NODE_ENV = 'test';
process.env.DB_URL = 'mongodb://localhost:27017/atm-test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let TransactionModel = require('../../models/transaction/transaction.model');

chai.should();
chai.use(chaiHttp);

describe('Deposit', () => {
	beforeEach((done) => {
		TransactionModel.deleteMany({}, () => {
			done();
		});
	});

	describe('/POST deposit/to-deposit', () => {
		it('it should to deposit valid money notes', (done) => {
			let MoneyNotes = [{
				value: 100,
				quantity: 5
			}, {
				value: 50,
				quantity: 5
			}, {
				value: 20,
				quantity: 5
			}, {
				value: 10,
				quantity: 5
			}, {
				value: 5,
				quantity: 5
			}, {
				value: 2,
				quantity: 5
			}];
			let Data = {
				MoneyNotes
			};

			chai.request(app)
				.post('/deposit/to-deposit')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(true);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes.should.be.a('array');
					SuccessResponse.body.Response.MoneyNotes.length.should.be.eql(6);
					SuccessResponse.body.Response._id.should.be.match(/^[a-fA-F0-9]{24}$/);
					done();
				});
		});

		it('it should to deposit invalid money notes', (done) => {
			let MoneyNotes = {
				$or: [{
					1: 1
				}]
			};
			let Data = {
				MoneyNotes
			};

			chai.request(app)
				.post('/deposit/to-deposit')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('DEPOSIT_TO_DEPOSIT_MONEY_NOTES_INVALID');
					done();
				});
		});

		it('it should to deposit no money notes', (done) => {
			let MoneyNotes = [];
			let Data = {
				MoneyNotes
			};

			chai.request(app)
				.post('/deposit/to-deposit')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('DEPOSIT_TO_DEPOSIT_MONEY_NOTES_SHORT');
					done();
				});
		});

		it('it should to deposit money note with wrong quantity', (done) => {
			let MoneyNotes = [{
				value: 100,
				quantity: '5'
			}];
			let Data = {
				MoneyNotes
			};

			chai.request(app)
				.post('/deposit/to-deposit')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('DEPOSIT_TO_DEPOSIT_MONEY_NOTES_INVALID');
					done();
				});
		});

		it('it should to deposit money note with wrong value', (done) => {
			let MoneyNotes = [{
				value: 33,
				quantity: 5
			}];
			let Data = {
				MoneyNotes
			};

			chai.request(app)
				.post('/deposit/to-deposit')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('DEPOSIT_TO_DEPOSIT_MONEY_NOTES_INVALID');
					done();
				});
		});
	});
});