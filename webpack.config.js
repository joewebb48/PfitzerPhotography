



const NodeExternals = require( 'webpack-node-externals' )

const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )



module.exports = ( ) => {
	// Application environment
	const dev = process.env.mode === 'development' ? true : false
	return [
		// Browser configuration
		{
			mode: dev ? 'development' : 'production',
			entry: {
				main: [ '@babel/polyfill', './view/index.js' ]
			},
			module: {
				rules: [
					{ test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
					{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
				]
			},
			plugins: [
				new CopyWebpackPlugin( [
					'static/favicon.ico',
					'static/admin.css'
				] ),
				new HtmlWebpackPlugin( {
					inject: false,
					template: 'static/index.html',
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
				path: __dirname + '/root'
			}
		},
		// Server configuration
		{
			mode: dev ? 'development' : 'production',
			entry: {
				node: [ '@babel/polyfill', './view/express.js' ]
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
				path: __dirname + '/node'
			}
		}
	]
}


