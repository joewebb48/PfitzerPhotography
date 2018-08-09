



const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

const webpack = require( 'webpack' )

const dev = process.env.mode === 'development' ? true : false
const hot = 'webpack-hot-middleware/client?name=browser'



module.exports = {
	name: 'browser',
	mode: dev ? 'development' : 'production',
	entry: {
		main: [ './view/index.js', hot + '&path=http://localhost:3000/__webpack_hmr' ],
	},
	module: {
		rules: [
			{ test: /\.css$/, use: [ dev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader' ] },
			{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin( ),
		new CopyWebpackPlugin( [
			'root/favicon.ico',
			{ from: 'root/img', to: 'img' }
		] ),
		new HtmlWebpackPlugin( {
			inject: false,
			template: 'root/index.html',
			minify: {
				removeComments: true
			}
		} ),
		new MiniCssExtractPlugin( {
			filename: 'styles.css',
			chunkFilename: '[id].css'
		} ),
	],
	stats: {
		cachedAssets: false,
		colors: true,
		entrypoints: false,
		excludeAssets: /img/,
		modules: false
	},
	watchOptions: {
		ignored: /node_modules/
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/public'
	}
}



