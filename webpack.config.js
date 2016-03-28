var path = require('path');

module.exports = {
	devtool: 'eval',
	entry: [ 
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
		'./views/layout.jsx'
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/assets/'
	},
	debug : true,
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.js$/,
			loaders: ['react-hot', 'babel'],
			include: path.join(__dirname, 'src')
		}]
	}
}