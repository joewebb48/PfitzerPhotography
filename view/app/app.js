



import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './router'
import viewStore from './stores/viewstore'



class App extends Component {
	
	render( ) {
		const store = viewStore( )
		return (
			<Provider store={ store }>
				<BrowserRouter>
					<Router/>
				</BrowserRouter>
			</Provider>
		)
	}
	
}


export default App



