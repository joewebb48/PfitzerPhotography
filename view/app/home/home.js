



import React, { Component } from 'react'

import Navigator from '../navigator/navigator'
import './home.css'



class Home extends Component {
	
	render( ) {
		return (
			<section>
				<header>
					<h1 className="home-title"> Pfitzer Photography </h1>
					<Navigator className="home-nav"/>
				</header>
				<p className="page-intro"> Yay, photography! </p>
			</section>
		)
	}
	
}


export default Home


