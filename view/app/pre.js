



import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './router'
import nodeBox from './boxes/nodebox'



class App extends Component {
	
	render( ) {
		const box = nodeBox( )
		const context = this.props.data ? this.props.data : {  }
		return (
			<Provider store={ box }>
				<StaticRouter location={ this.props.url } context={ context }>
					<Router/>
				</StaticRouter>
			</Provider>
		)
	}
	
}


export default App


