



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
				main: './view/index.js',
			},
			module: {
				rules: [
					{ test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
					{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
				]
			},
			plugins: [
				new CopyWebpackPlugin( [
					'root/favicon.ico',
					'root/admin.css',
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
		},
		// Server configuration
		{
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
				path: __dirname + '/node'
			}
		}
	]
}



