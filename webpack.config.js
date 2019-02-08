



const NodeExternals = require( 'webpack-node-externals' )
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin

const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const BabelMinifyPlugin = require( 'babel-minify-webpack-plugin' )
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const OptimizeCSSPlugin = require( 'optimize-css-assets-webpack-plugin' )
const CleanWebpackPlugin = require( 'clean-webpack-plugin' )



module.exports = ( ) => {
	// Application environment
	const dev = process.env.MODE === 'development' ? true : false
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
					'static/admin.css',
					'static/widget.html',
					{ from: 'static/img', to: 'img' }
				] ),
				new HtmlWebpackPlugin( {
					inject: false,
					template: 'static/index.html',
					minify: {
						removeComments: true,
						...dev ? {  } : {
							collapseWhitespace: true,
							removeRedundantAttributes: true,
							removeScriptTypeAttributes: true,
							removeStyleLinkTypeAttributes: true
						}
					}
				} ),
				new MiniCssExtractPlugin( {
					filename: 'styles.css',
					chunkFilename: '[id].css'
				} ),
				new CleanWebpackPlugin( 'root' )
			// Plugins for production
			].concat( dev ? [ ] : [
				new BabelMinifyPlugin( {
					mangle: {
						topLevel: true
					}
				} ),
				new BundleAnalyzerPlugin( {
					generateStatsFile: false,
					openAnalyzer: false
				} )
			] ),
			devtool: dev ? 'eval-source-map' : false,
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
			optimization: {
				splitChunks: {
					name: false,
					chunks: 'all',
					cacheGroups: {
						polyfill: {
							test: /[\\/](core-js|@babel\/polyfill)[\\/]/,
							filename: 'polyfill.js',
							priority: 1
						},
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							filename: 'vendor.js',
							priority: 0
						}
					}
				},
				// Optimizations for production
				...dev ? {  } : {
					concatenateModules: true,
					minimizer: [
						new UglifyJsPlugin( {
							cache: true,
							parallel: true,
							uglifyOptions: {
								output: {
									comments: false,
								},
							},
						} ),
						new OptimizeCSSPlugin( {  } )
					]
				}
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
			// Plugins for production
			plugins: [ ].concat( dev ? [ ] : [
				new BabelMinifyPlugin( {
					mangle: {
						topLevel: true
					}
				} )
			] ),
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
			optimization: {
				splitChunks: {
					name: false,
					chunks: 'all',
					cacheGroups: {
						polyfill: {
							test: /[\\/](core-js|@babel\/polyfill)[\\/]/,
							filename: 'polyfill.js',
							priority: 1
						},
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							filename: 'vendor.js',
							priority: 0
						}
					}
				},
				// Optimizations for production
				...dev ? {  } : {
					concatenateModules: true,
					minimizer: [
						new UglifyJsPlugin( {
							parallel: true,
							uglifyOptions: {
								output: {
									comments: false,
								},
							},
						} )
					]
				}
			},
			target: 'node',
			output: {
				filename: '[name].js',
				path: __dirname + '/node'
			}
		}
	]
}



