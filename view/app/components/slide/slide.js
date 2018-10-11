



import React, { Component } from 'react'

import './slide.css'



class Slide extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { current: '' }
	}
	
	
	viewNext( ) {
		setInterval( ( ) => {
			// Image filtering and selection will be done here
		}, 6000 )
	}
	
	render( ) {
		console.log( 'Slide', this.props.container, this.props.photos )
		const image = this.state.current.length > 0 ? null : '/public/img/test1.jpg'
		return image ? <img src={ image } alt=""/> : <div className="slide-empty"/>
	}
	
}


export default Slide



