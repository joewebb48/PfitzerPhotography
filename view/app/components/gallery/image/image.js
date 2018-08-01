



import React, { Component } from 'react'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { viewMode: 'hide' }
		this.elevateUp = this.elevateUp.bind( this )
		this.fallBack = this.fallBack.bind( this )
	}
	
	
	elevateUp( ) {
		if ( this.state.viewMode !== 'fade' ) {
			this.setState( { viewMode: 'view' } )
		}
		else if ( this.state.viewMode === 'fade' ) {
			// Prevent panel snapping from quickly moving back
			setTimeout( ( ) => {
				this.setState( { viewMode: 'view' } )
			}, 400 )
		}
	}
	
	fallBack( ) {
		if ( this.state.viewMode !== 'hide' ) {
			setTimeout( ( ) => {
				// Disallow panel hiding if it is being viewed again
				if ( this.state.viewMode !== 'view' ) {
					this.setState( { viewMode: 'hide' } )
				}
			}, 500 )
			this.setState( { viewMode: 'fade' } )
		}
	}
	
	setPanel( ) {
		const price = this.props.image.price ? 'Price: $' + this.props.image.price : null
		const date = this.props.image.date ? 'Date: ' + this.props.image.date : null
		const animation = this.state.viewMode === 'view' ? 'image-panel-view' : 'image-panel-fade'
		if ( this.state.viewMode !== 'hide' ) {
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
		const events = { onMouseEnter: this.elevateUp, onMouseLeave: this.fallBack }
		return (
			<div className="image-box" { ...events }>
				<div className="image-shadow"></div>
				<div className="image-frame">
					<div className="image-border"></div>
					<img className="image-thumbnail" src={ url }/>
				</div>
				{ this.setPanel( ) }
			</div>
		)
	}
	
}


export default Image



