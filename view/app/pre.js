



import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'

import Router from './router'



class App extends Component {
	
	render( ) {
		return (
			<StaticRouter location={ this.props.url } context={ {  } }>
				<Router/>
			</StaticRouter>
		)
	}
	
}


export default App


