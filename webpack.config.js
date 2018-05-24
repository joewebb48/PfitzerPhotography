



const NodeExternals = require( 'webpack-node-externals' )



module.exports = [
	// Browser configuration
	{
		entry: {
			main: './view/index.js'
		},
		module: {
			rules: [
				{ test: /\.svg$/, use: 'url-loader' },
				{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
				{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
			]
		},
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
				{ test: /\.svg$/, use: 'url-loader' },
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



