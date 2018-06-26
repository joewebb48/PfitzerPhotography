



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
		const price = this.props.image.price ? 'Price: $' + this.props.image.price : null
		const date = this.props.image.date ? 'Date: ' + this.props.image.date : null
		var animation = this.state.isOpen ? 'image-panel-view' : 'image-panel-exit'
		if ( this.state.isOpen ) {
			return (
				<div className={ 'image-panel ' + animation }>
					<h3 className="image-title"> { this.props.image.name } </h3>
					<h5 className="image-category"> Category </h5>
					<p className="image-summary"> { this.props.image.description } </p>
					<span className="image-price"> { price } </span>
					<span className="image-date"> { date } </span>
				</div>
			)
		}
	}
	
	render( ) {
		const url = 'root/' + this.props.image.image
		console.log( url )
		console.log( this.props.image )
		var style = this.state.isOpen ? 'image-box-grow' : 'image-box-base'
		return (
			<div className={ 'image-box ' + style } onClick={ ( ) => this.togglePanel( ) }>
				<div className="image-frame">
					<img className="image-thumbnail" src={ url }/>
				</div>
				{ this.openPanel( ) }
			</div>
		)
	}
	
}


export default Image



