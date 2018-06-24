



import React, { Component } from 'react'
import axios from 'axios'

import Navigator from '../navigator/navigator'
import Image from './image/image'
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
			return <Image key={ image.pk } image={ image.fields }/>
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


