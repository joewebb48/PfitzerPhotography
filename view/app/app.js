



import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './router'
import viewBox from './boxes/viewbox'



class App extends Component {
	
	render( ) {
		return (
			<Provider store={ viewBox }>
				<BrowserRouter>
					<Router/>
				</BrowserRouter>
			</Provider>
		)
	}
	
}


export default App


