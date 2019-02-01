import Config from './config';
import RequestService from './services/request.service';
import AlertService from './services/alert.service';
import WithdrawalModel from './models/withdrawal.model';
import DepositModel from './models/deposit.model';
import WithdrawalController from './modules/withdrawal/withdrawal.controller';
import DepositController from './modules/deposit/deposit.controller';
import AppRoute from './app.route';
import angular from 'angular';
import 'angular-route';
import 'angular-mocks';
const app = angular.module('atm', [
	'ngRoute'
]);
import './css/app.css';

app.constant('Config', Config);
app.service('RequestService', RequestService);
app.service('AlertService', AlertService);
app.service('WithdrawalModel', WithdrawalModel);
app.service('DepositModel', DepositModel);
app.controller('WithdrawalController', WithdrawalController);
app.controller('DepositController', DepositController);
app.config(AppRoute);

export default app;