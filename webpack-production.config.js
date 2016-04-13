var path = require('path');
var webpack = require('webpack');


module.exports = {
	entry: [
		'./webapp/main.js'
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/bundle.js'
	},
	devtool: 'cheap-module-source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: true
			}
		})
	]
}
