



import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './router'



class App extends Component {
	
	render( ) {
		const context = this.props.data ? this.props.data : {  }
		return (
			<Provider store={ this.props.box }>
				<StaticRouter location={ this.props.url } context={ context }>
					<Router/>
				</StaticRouter>
			</Provider>
		)
	}
	
}


export default App


