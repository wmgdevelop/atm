module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'src/app.test.js'
		],
		exclude: [],
		preprocessors: {
			'src/app.test.js': ['webpack']
		},
		reporters: ['progress'],
		webpack: require('./webpack.test.config'),
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		concurrency: Infinity
	})
}
