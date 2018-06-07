



import React, { Component } from 'react'

import Navigator from '../navigator/navigator'
import './gallery.css'



class Gallery extends Component {
	
	populateFrame( ) {
		var key = 0
		return Array( 12 ).fill( null ).map( ( ) => {
			key++
			return <img key={ key } className="gallery-thumbnail"/>
		} )
	}
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
				<div className="gallery-frame">
					{ this.populateFrame( ) }
				</div>
			</section>
		)
	}
	
}


export default Gallery



