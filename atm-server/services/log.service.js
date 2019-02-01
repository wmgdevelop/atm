const DateService = require('./date.service');
const Colors = {
    default: '\x1b[0m',
    bold: '\x1b[1m',
	spotlight: '\x1b[93m',
    success: '\x1b[94m',
    error: '\x1b[91m'
};

module.exports = {
    success,
    error
};

function success(message) {
    log(Colors.success, message);
}

function error(message) {
    log(Colors.error, message);
}

function log(color, message) {
	if (process.env.NODE_ENV === 'test') {
		return;
	}

    const dateTime = DateService.toExtensive(new Date());
    const correctMessage = message.padEnd(150, ' ');

    process.stdout.write(`${Colors.default}${Colors.spotlight}[${dateTime}]${Colors.bold}${color} ${correctMessage}${Colors.default}\r\n`);
}