module.exports = {
	mode: 'development',
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
	output: {}
};