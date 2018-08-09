



const NodeExternals = require( 'webpack-node-externals' )

const dev = process.env.mode === 'development' ? true : false



module.exports = {
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


