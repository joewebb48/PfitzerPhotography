



import React, { Component } from 'react'

import logo from './logo.svg'
import './app.css'



class App extends Component {
	
	render( ) {
		return (
			<div className="app">
				<header className="app-header">
					<img src={ logo } className="app-logo" alt="logo" />
					<h1 className="app-title"> Pfitzer Photography </h1>
				</header>
				<p className="app-intro"> Woo, photography! </p>
			</div>
		)
	}
	
}


export default App


