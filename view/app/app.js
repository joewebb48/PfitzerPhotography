



import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import Router from './router'



const nexus = createStore( reducers, {  }, applyMiddleware( thunk ) )


class App extends Component {
	
	render( ) {
		return (
			<Provider store={ nexus }>
				<BrowserRouter>
					<Router/>
				</BrowserRouter>
			</Provider>
		)
	}
	
}


export default App


