



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
				<div className="gallery-frame">
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
					<img className="gallery-thumbnail"/>
				</div>
			</section>
		)
	}
	
}


export default Gallery


