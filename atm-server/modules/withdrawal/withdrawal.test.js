process.env.NODE_ENV = 'test';
process.env.DB_URL = 'mongodb://localhost:27017/atm-test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let TransactionModel = require('../../models/transaction/transaction.model');

chai.should();
chai.use(chaiHttp);

describe('Withdrawal', () => {
	beforeEach((done) => {
		TransactionModel.deleteMany({}, () => {
			done();
		});
	});

	describe('/POST withdrawal/to-withdrawal', () => {
		it('it should to withdrawal valid money notes (100)', (done) => {
			let value = 100;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(true);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes.should.be.a('array');
					SuccessResponse.body.Response.MoneyNotes.length.should.be.eql(1);
					SuccessResponse.body.Response.MoneyNotes[0].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[0].value.should.eql(100);
					SuccessResponse.body.Response.MoneyNotes[0].quantity.should.eql(1);
					SuccessResponse.body.Response._id.should.be.match(/^[a-fA-F0-9]{24}$/);
					done();
				});
		});

		it('it should to withdrawal valid money notes (40 = 20 + 20)', (done) => {
			let value = 40;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(true);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes.should.be.a('array');
					SuccessResponse.body.Response.MoneyNotes.length.should.be.eql(1);
					SuccessResponse.body.Response.MoneyNotes[0].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[0].value.should.eql(20);
					SuccessResponse.body.Response.MoneyNotes[0].quantity.should.eql(2);
					SuccessResponse.body.Response._id.should.be.match(/^[a-fA-F0-9]{24}$/);
					done();
				});
		});

		it('it should to withdrawal valid money notes (60 = 50 + 10)', (done) => {
			let value = 60;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(true);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes.should.be.a('array');
					SuccessResponse.body.Response.MoneyNotes.length.should.be.eql(2);
					SuccessResponse.body.Response.MoneyNotes[0].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[0].value.should.eql(50);
					SuccessResponse.body.Response.MoneyNotes[0].quantity.should.eql(1);
					SuccessResponse.body.Response.MoneyNotes[1].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[1].value.should.eql(10);
					SuccessResponse.body.Response.MoneyNotes[1].quantity.should.eql(1);
					SuccessResponse.body.Response._id.should.be.match(/^[a-fA-F0-9]{24}$/);
					done();
				});
		});

		it('it should to withdrawal valid money notes (380 = 3 x 100 + 50 + 20 + 10)', (done) => {
			let value = 380;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(true);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes.should.be.a('array');
					SuccessResponse.body.Response.MoneyNotes.length.should.be.eql(4);
					SuccessResponse.body.Response.MoneyNotes[0].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[0].value.should.eql(100);
					SuccessResponse.body.Response.MoneyNotes[0].quantity.should.eql(3);
					SuccessResponse.body.Response.MoneyNotes[1].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[1].value.should.eql(50);
					SuccessResponse.body.Response.MoneyNotes[1].quantity.should.eql(1);
					SuccessResponse.body.Response.MoneyNotes[2].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[2].value.should.eql(20);
					SuccessResponse.body.Response.MoneyNotes[2].quantity.should.eql(1);
					SuccessResponse.body.Response.MoneyNotes[3].should.be.a('object');
					SuccessResponse.body.Response.MoneyNotes[3].value.should.eql(10);
					SuccessResponse.body.Response.MoneyNotes[3].quantity.should.eql(1);
					SuccessResponse.body.Response._id.should.be.match(/^[a-fA-F0-9]{24}$/);
					done();
				});
		});

		it('it should to withdrawal valid money notes (22 = 20 + 2)', (done) => {
			// Deposit before because money note R$ 2,00
			let MoneyNotes = [{
				value: 2,
				quantity: 1
			}];
			let DataDeposit = {
				MoneyNotes
			};
			let value = 22;
			let DataWithdrawal = {
				value
			};

			chai.request(app)
				.post('/deposit/to-deposit')
				.send(DataDeposit)
				.end((FailResponseDeposit, SuccessResponseDeposit) => {
					SuccessResponseDeposit.should.have.status(200);
					SuccessResponseDeposit.body.should.be.a('object');
					SuccessResponseDeposit.body.should.have.property('successfully');
					SuccessResponseDeposit.body.successfully.should.be.eql(true);

					chai.request(app)
						.post('/withdrawal/to-withdrawal')
						.send(DataWithdrawal)
						.end((FailResponseWithdrawal, SuccessResponseWithdrawal) => {
							SuccessResponseWithdrawal.should.have.status(200);
							SuccessResponseWithdrawal.body.should.be.a('object');
							SuccessResponseWithdrawal.body.should.have.property('successfully');
							SuccessResponseWithdrawal.body.successfully.should.be.eql(true);
							SuccessResponseWithdrawal.body.should.have.property('Response');
							SuccessResponseWithdrawal.body.Response.should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes.should.be.a('array');
							SuccessResponseWithdrawal.body.Response.MoneyNotes.length.should.be.eql(2);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[0].should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes[0].value.should.eql(20);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[0].quantity.should.eql(1);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[1].should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes[1].value.should.eql(2);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[1].quantity.should.eql(1)
							SuccessResponseWithdrawal.body.Response._id.should.be.match(/^[a-fA-F0-9]{24}$/);
							done();
						});
				});
		});

		it('it should to withdrawal valid money notes (157 = 100 + 50 + 5 + 2)', (done) => {
			// Deposit before because money note R$ 2,00 and R$ 5,00
			let MoneyNotes = [{
				value: 2,
				quantity: 1
			}, {
				value: 5,
				quantity: 1
			}];
			let DataDeposit = {
				MoneyNotes
			};
			let value = 157;
			let Data = {
				value
			};

			chai.request(app)
				.post('/deposit/to-deposit')
				.send(DataDeposit)
				.end((FailResponseDeposit, SuccessResponseDeposit) => {
					SuccessResponseDeposit.should.have.status(200);
					SuccessResponseDeposit.body.should.be.a('object');
					SuccessResponseDeposit.body.should.have.property('successfully');
					SuccessResponseDeposit.body.successfully.should.be.eql(true);
					chai.request(app)
						.post('/withdrawal/to-withdrawal')
						.send(Data)
						.end((FailResponseWithdrawal, SuccessResponseWithdrawal) => {
							SuccessResponseWithdrawal.should.have.status(200);
							SuccessResponseWithdrawal.body.should.be.a('object');
							SuccessResponseWithdrawal.body.should.have.property('successfully');
							SuccessResponseWithdrawal.body.successfully.should.be.eql(true);
							SuccessResponseWithdrawal.body.should.have.property('Response');
							SuccessResponseWithdrawal.body.Response.should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes.should.be.a('array');
							SuccessResponseWithdrawal.body.Response.MoneyNotes.length.should.be.eql(4);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[0].should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes[0].value.should.eql(100);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[0].quantity.should.eql(1);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[1].should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes[1].value.should.eql(50);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[1].quantity.should.eql(1);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[2].should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes[2].value.should.eql(5);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[2].quantity.should.eql(1);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[3].should.be.a('object');
							SuccessResponseWithdrawal.body.Response.MoneyNotes[3].value.should.eql(2);
							SuccessResponseWithdrawal.body.Response.MoneyNotes[3].quantity.should.eql(1);
							SuccessResponseWithdrawal.body.Response._id.should.be.match(/^[a-fA-F0-9]{24}$/);
							done();
						});
				});
		});

		it('it should to withdrawal invalid value', (done) => {
			let value = '80';
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('WITHDRAWAL_TO_WITHDRAWAL_VALUE_INVALID');
					done();
				});
		});

		it('it should to withdrawal short value', (done) => {
			let value = 0;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('WITHDRAWAL_TO_WITHDRAWAL_VALUE_SHORT');
					done();
				});
		});

		it('it should to withdrawal decimal value', (done) => {
			let value = 20.5;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('WITHDRAWAL_TO_WITHDRAWAL_VALUE_IS_INTEGER');
					done();
				});
		});

		it('it should to withdrawal nonexistent value', (done) => {
			let value = 27;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('WITHDRAWAL_TO_WITHDRAWAL_THERE_ARE_NO_NOTES_FOR_VALUE');
					done();
				});
		});

		it('it should to withdrawal unavailable value', (done) => {
			let value = 28;
			let Data = {
				value
			};

			chai.request(app)
				.post('/withdrawal/to-withdrawal')
				.send(Data)
				.end((FailResponse, SuccessResponse) => {
					SuccessResponse.should.have.status(200);
					SuccessResponse.body.should.be.a('object');
					SuccessResponse.body.should.have.property('successfully');
					SuccessResponse.body.successfully.should.be.eql(false);
					SuccessResponse.body.should.have.property('Response');
					SuccessResponse.body.Response.should.be.eql('WITHDRAWAL_TO_WITHDRAWAL_THERE_ARE_NO_NOTES_FOR_VALUE');
					done();
				});
		});
	});
});