



import React, { Component } from 'react'

import Navigator from '../navigator/navigator'
import './about.css'



class About extends Component {
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
				<p className="page-intro"> About </p>
			</section>
		)
	}
	
}


export default About



