import 'angular';
import 'angular-mocks';
import './app';

let context = require.context('./', true, /\.test\.js/);
context.keys().forEach(context);