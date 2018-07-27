



import React, { Component } from 'react'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { viewMode: 'hide' }
		this.hover = this.togglePanel.bind( this )
	}
	
	
	animateMode( id, view, fade ) {
		const first = ' ' + id + '-' + view
		const second = ' ' + id + '-' + fade
		if ( this.state.viewMode !== 'hide' ) {
			return this.state.viewMode === 'view' ? first : second
		}
		return ''
	}
	
	togglePanel( ) {
		switch ( this.state.viewMode ) {
			case 'hide':
				console.log( 'Hide' )
				return this.setState( { viewMode: 'view' } )
			case 'view':
				console.log( 'View' )
				this.setState( { viewMode: 'fade' } )
				return setTimeout( ( ) => {
					console.log( 'Fade' )
					this.setState( { viewMode: 'hide' } )
				}, 500 )
		}
	}
	
	openPanel( ) {
		const ids = { panel: 'image-panel', modes: [ ] }
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
		const events = { onMouseEnter: this.hover, onMouseLeave: this.hover }
		console.log( url )
		console.log( this.props.image )
		const style = this.animateMode( 'image-box', 'bubble', 'recede' )
		return (
			<div className={ 'image-box' + style } { ...events }>
				<div className="image-shadow"></div>
				<div className="image-frame">
					<div className="image-border"></div>
					<img className="image-thumbnail" src={ url }/>
				</div>
				{ this.openPanel( ) }
			</div>
		)
	}
	
}


export default Image


