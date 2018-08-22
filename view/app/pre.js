



import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './router'
import nodeBox from './boxes/nodebox'



class App extends Component {
	
	render( ) {
		const box = nodeBox( )
		return (
			<Provider store={ box }>
				<StaticRouter location={ this.props.url } context={ this.props.data }>
					<Router/>
				</StaticRouter>
			</Provider>
		)
	}
	
}


export default App



