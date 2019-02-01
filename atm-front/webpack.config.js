const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg)$/,
				use: ['url-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './src'
	},
	plugins: [
		new CopyWebpackPlugin([
			{from: 'src/index.html', to: ''},
			{from: 'src/modules/withdrawal/withdrawal.view.html', to: 'modules/withdrawal/withdrawal.view.html'},
			{from: 'src/modules/deposit/deposit.view.html', to: 'modules/deposit/deposit.view.html'},
			{from: 'src/images/money-notes.png', to: 'images/money-notes.png'},
			{from: 'src/images/logo/image-logo-256x256.png', to: 'images/logo/image-logo-256x256.png'},
			{from: 'src/images/logo/image-logo-192x192.png', to: 'images/logo/image-logo-192x192.png'},
			{from: 'src/images/logo/image-logo-32x32.png', to: 'images/logo/image-logo-32x32.png'},
			{from: 'src/images/logo/image-logo-16x16.png', to: 'images/logo/image-logo-16x16.png'},
			{from: 'src/favicon.ico', to: 'favicon.ico'},
			{from: 'src/manifest.json', to: 'manifest.json'},
		])
	]
};