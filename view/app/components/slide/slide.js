



import React, { Component } from 'react'

import './slide.css'



class Slide extends Component {
	
	constructor( props ) {
		super( props )
		// Locates the slide dimensions for selecting slide photos
		this.element = React.createRef( )
		this.state = { current: '' }
	}
	
	
	viewNext( ) {
		setInterval( ( ) => {
			// Image filtering, selection, and transition is done here
		}, 6000 )
	}
	
	render( ) {
		const load = this.props.photos.length > 0
		console.log( 'Slide', this.props.photos, this.element.current )
		const image = this.state.current.length > 0 ? null : '/public/img/test1.jpg'
		const props = { ref: this.element, src: load ? image : null, alt: load ? '' : null }
		return load ? <img { ...props }/> : <div className="slide-empty" { ...props }/>
	}
	
}


export default Slide



