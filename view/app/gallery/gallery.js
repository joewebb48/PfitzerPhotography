



import React, { Component } from 'react'

import Navigator from '../navigator/navigator'
import './gallery.css'



class Gallery extends Component {
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
				<p className="page-intro"> Gallery </p>
			</section>
		)
	}
	
}


export default Gallery



