



import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './router'
import viewBox from './boxes/viewbox'



class App extends Component {
	
	render( ) {
		const box = viewBox( )
		return (
			<Provider store={ box }>
				<BrowserRouter>
					<Router/>
				</BrowserRouter>
			</Provider>
		)
	}
	
}


export default App



