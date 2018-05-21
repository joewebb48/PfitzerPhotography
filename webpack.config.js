



const HtmlWebpackPlugin = require( 'html-webpack-plugin' )



module.exports = {
	entry: {
		main: './view/index.js'
	},
	module: {
		rules: [
			{ test: /\.svg$/, use: 'file-loader' },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
			{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			filename: 'index.html',
			template: 'public/index.html'
		} )
	],
	devServer: {
		contentBase: 'exe',
		port: 3000,
		stats: {
			children: false,
			entrypoints: false,
			modules: false
		}
	},
	stats: {
		children: false,
		entrypoints: false,
		modules: false
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/exe'
	}
}



