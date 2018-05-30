



import React, { Component } from 'react'

import logo from '../../../root/img/logo.svg'
import './home.css'



class Home extends Component {
	
	render( ) {
		return (
			<section>
				<header className="app-header">
					<img src={ logo } className="app-logo" alt="logo"/>
					<h1 className="app-title"> Pfitzer Photography </h1>
				</header>
				<p className="app-intro"> Yay, photography! </p>
			</section>
		)
	}
	
}


export default Home


