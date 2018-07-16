



import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './router'
import nodeBox from './boxes/nodebox'



class App extends Component {
	
	render( ) {
		return (
			<Provider store={ nodeBox }>
				<StaticRouter location={ this.props.url } context={ {  } }>
					<Router/>
				</StaticRouter>
			</Provider>
		)
	}
	
}


export default App


