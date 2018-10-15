



import React, { Component } from 'react'

import './slide.css'



class Slide extends Component {
	
	constructor( props ) {
		super( props )
		// Locates the slide dimensions for selecting slide photos
		this.element = React.createRef( )
		this.state = { current: null, scope: { x: 0, y: 0 } }
	}
	
	
	componentDidMount( ) {
		// Identify the slider boundary to measure images against
		const height = this.element.current.parentNode.clientHeight
		const width = this.element.current.parentNode.clientWidth
		this.setState( { scope: { x: width, y: height } } )
	}
	
	componentDidUpdate( ) {
		if ( !this.state.current && this.props.photos.length > 0 ) {
			// Set the initial slider image before initializing the slider
			const data = this.viewNext( 0 )
			const url = data ? '/public/' + data.image : null
			const text = data ? data.description : null
			this.setState( { current: { url: url, text: text } } )
			/* !this.state.current ? null : setInterval( ( ) => {
				// Filtering, selection, and transition will be done here
			}, 6000 ) */
		}
	}
	
	viewNext( cycle ) {
		// Generate an array index to randomize photo inspection
		const random = Math.random( ) * this.props.photos.length
		const identifier = Math.floor( random )
		// Verify whether or not the image will fill the slider area
		const { height, width } = this.props.photos[ identifier ].fields
		const fill = height >= this.state.scope.y && width >= this.state.scope.x
		// Keep searching until a sufficiently sized image is found
		const view = fill ? this.props.photos[ identifier ].fields : null
		const boundary = cycle++ === 20 || fill
		return !boundary ? this.viewNext( cycle ) : view
	}
	
	render( ) {
		const image = this.state.current ? this.state.current.url : null
		const synopsis = this.state.current ? this.state.current.text : null
		const props = { ref: this.element, src: image, alt: synopsis }
		return image ? <img { ...props }/> : <div className="slide-empty" { ...props }/>
	}
	
}


export default Slide



