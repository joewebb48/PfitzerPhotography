



import React, { Component } from 'react'
import axios from 'axios'

import Navigator from '../navigator/navigator'
import './gallery.css'



class Gallery extends Component {
	
	populateFrame( ) {
		axios.get( '/photos' )
			.then( images => console.log( images ) )
			.catch( error => console.log( error ) )
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



