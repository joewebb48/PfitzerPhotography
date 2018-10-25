



import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './app'
import viewStore from './stores/viewstore'



class Browser extends Component {
	
	render( ) {
		const store = viewStore( )
		return (
			<Provider store={ store }>
				<BrowserRouter>
					<App/>
				</BrowserRouter>
			</Provider>
		)
	}
	
}


export default Browser



