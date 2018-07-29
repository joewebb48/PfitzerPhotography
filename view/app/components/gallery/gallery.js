



import React, { Component } from 'react'
import axios from 'axios'

import Navigator from '../navigator/navigator'
import Image from './image/image'
import './gallery.css'



class Gallery extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { images: [ ], view: null }
		this.viewHover = this.viewHover.bind( this )
	}
	
	
	componentDidMount( ) {
		axios.get( '/photos' ).then( images => {
			this.setState( { images: images.data } )
		} )
	}
	
	populateFrame( ) {
		let rank = 1
		return this.state.images.map( image => {
			let props = { rk: rank++, image: image.fields, last: this.state.view }
			let events = { viewHover: this.viewHover }
			return <Image key={ image.pk } { ...props } { ...events }/>
		} )
	}
	
	viewHover( frame, callback ) {
		if ( !this.state.view ) {
			// Only image being hovered over
			console.log( '\nHovering!', frame.props.rk )
			this.setState( { view: frame } )
		}
		else if ( frame === this.state.view ) {
			// Image no longer being hovered
			if ( frame.state.viewMode === 'fade' ) {
				setTimeout( ( ) => {
					console.log( 'Undone!', frame.props.rk, '\n' )
					this.setState( { view: null } )
				}, 500 )
				console.log( 'Waiting...' )
			}
		}
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



