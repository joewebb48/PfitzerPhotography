



const NodeExternals = require( 'webpack-node-externals' )

const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

const webpack = require( 'webpack' )


// Application environment
const dev = process.env.mode === 'development' ? true : false
// Hot module middleware
const hot = 'webpack-hot-middleware/client?name=browser'



module.exports = [
	// Browser configuration
	{
		name: 'browser',
		mode: dev ? 'development' : 'production',
		entry: {
			main: [ hot + '&path=http://localhost:3000/__webpack_hmr', './view/index.js' ],
		},
		module: {
			rules: [
				{ test: /\.css$/, use: [ dev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader' ] },
				{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin( ),
			new webpack.NoEmitOnErrorsPlugin( ),
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
			path: __dirname + '/public',
			publicPath: '/'
		}
	},
	// Server configuration
	{
		name: 'server',
		mode: dev ? 'development' : 'production',
		entry: {
			node: './view/express.js'
		},
		module: {
			rules: [
				{ test: /\.css$/, use: 'css-loader' },
				{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
			]
		},
		externals: [
			NodeExternals( )
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
		target: 'node',
		output: {
			filename: '[name].js',
			path: __dirname + '/node',
			publicPath: '/'
		}
	}
]


