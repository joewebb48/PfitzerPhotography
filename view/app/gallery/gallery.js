



import React, { Component } from 'react'
import axios from 'axios'

import Navigator from '../navigator/navigator'
import './gallery.css'



class Gallery extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { images: [ ] }
	}
	
	
	componentDidMount( ) {
		axios.get( '/photos' ).then( images => {
			console.log( images )
			this.setState( { images: images.data } )
		} )
	}
	
	populateFrame( ) {
		return this.state.images.map( image => {
			console.log( image )
			const url = 'root/' + image.fields.image
			return <img key={ image.pk } className="gallery-thumbnail" src={ url }/>
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



