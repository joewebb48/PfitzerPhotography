



import React, { Component } from 'react'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { isOpen: false }
	}
	
	
	togglePanel( ) {
		this.state.isOpen ? this.setState( { isOpen: false } ) : this.setState( { isOpen: true } )
	}
	
	openPanel( ) {
		if ( this.state.isOpen ) {
			return (
				<h3 className="image-text">
					{ this.props.image.name }
				</h3>
			)
		}
	}
	
	render( ) {
		const url = 'root/' + this.props.image.image
		console.log( url )
		console.log( this.props.image )
		return (
			<div className="image-frame" onClick={ ( ) => this.togglePanel( ) }>
				<img className="image-thumbnail" src={ url }/>
				{ this.openPanel( ) }
			</div>
		)
	}
	
}


export default Image



