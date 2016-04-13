var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: [
		'./webapp/main.js'
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/bundle.js'
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
				BROWSER: JSON.stringify(true)
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: true
			}
		}),
		new ExtractTextPlugin('css/[name].css')
	]
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
			include: path.join(__dirname, 'webapp', 'style')
		}]
	}
}
