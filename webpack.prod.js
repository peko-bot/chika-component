/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-20 13:48:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-14 17:19:04
 */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('./webpack.common');

const dev = !!process.argv.includes('development');

let plugins = commonPlugin;

plugins.push(
	new CopyWebpackPlugin([
		{
			from: __dirname + '/src/assets',
			to: __dirname + '/dist/assets'
		},
		{
			from: __dirname + '/src/data',
			to: __dirname + '/dist/data'
		},
	])
);

plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

plugins.push(new TohoLogPlugin({ dev }));

!dev && plugins.push(new CleanWebpackPlugin(['dist'], {
	verbose: false
}));

const basePath = __dirname + '/src/component/';

const options = {
	mode: dev ? 'development' : 'production',
	// watch: dev,
	devServer: {
		port: 9099
	},
	externals: {
		'react': 'react',
		'react-dom': 'react-dom'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool: dev ? 'source-map' : '',
	entry: {
		// main: __dirname + '/src',
		ListContainer: basePath + 'ListContainer',
		Tabs: basePath + 'Tabs',
		Progress: basePath + 'Progress',
		Calendar: basePath + 'Calendar',
		EasyLeaflet: basePath + 'EasyLeaflet',
		Drawer: basePath + 'Drawer',
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		chunkFilename: dev ? 'vendor/[name].[chunkHash:8].js' : 'vendor/[name].js',
		libraryTarget: 'umd'
	},
	plugins,
	module: commonModule
};

// dev && webpack(options).watch({}, () => {});

// !dev && webpack(options).run();
webpack(options).run();