



const NodeExternals = require( 'webpack-node-externals' )

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )



module.exports = [
	// Browser configuration
	{
		entry: {
			main: './view/index.js'
		},
		module: {
			rules: [
				{ test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
				{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
			]
		},
		plugins: [
			new MiniCssExtractPlugin( {
				filename: 'styles.css',
				chunkFilename: '[id].css'
			} )
		],
		stats: {
			children: false,
			entrypoints: false,
			modules: false
		},
		output: {
			filename: '[name].js',
			path: __dirname + '/public'
		}
	},
	// Server configuration
	{
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
			children: false,
			entrypoints: false,
			modules: false
		},
		target: 'node',
		output: {
			filename: '[name].js',
			path: __dirname + '/node'
		}
	}
]



