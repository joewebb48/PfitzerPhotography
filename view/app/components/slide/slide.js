



import React, { Component } from 'react'

import './slide.css'



class Slide extends Component {
	
	constructor( props ) {
		super( props )
		// Locates the slide dimensions for selecting slide photos
		this.element = React.createRef( )
		this.state = { current: '', scope: { x: 0, y: 0 } }
	}
	
	
	componentDidMount( ) {
		// Identify the slider boundary to measure images against
		const height = this.element.current.parentNode.clientHeight
		const width = this.element.current.parentNode.clientWidth
		this.setState( { scope: { x: width, y: height } } )
	}
	
	componentDidUpdate( ) {
		if ( this.state.current.length === 0 && this.props.photos.length > 0 ) {
			// Set the initial slider image before initializing the slider
			const background = this.viewNext( )
			console.log( '\nSelected:', background, '\n\n' )
			this.setState( { current: '/public/' + background.image } )
			/* setInterval( ( ) => {
				// Filtering, selection, and transition will be done here
			}, 6000 ) */
		}
	}
	
	viewNext( ) {
		// Generate an array index to randomize photo inspection
		const random = Math.random( ) * this.props.photos.length
		const identifier = Math.floor( random )
		// Verify whether or not the image will fill the slider area
		const { height, width } = this.props.photos[ identifier ].fields
		const fill = height >= this.state.scope.y && width >= this.state.scope.x
		console.log( '\nBounds:', 'height', this.state.scope.y, 'width', this.state.scope.x )
		console.log( 'Image ' + identifier + ':', 'height', height, 'width', width, '\n' )
		// Keep searching until a sufficiently sized image is found
		return !fill ? this.viewNext( ) : this.props.photos[ identifier ].fields
	}
	
	render( ) {
		const ready = this.props.photos.length > 0
		const image = this.state.current.length > 0 ? this.state.current : null
		const props = { ref: this.element, src: image, alt: ready ? '' : null }
		return ready ? <img { ...props }/> : <div className="slide-empty" { ...props }/>
	}
	
}


export default Slide


