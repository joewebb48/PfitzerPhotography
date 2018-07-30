



import React, { Component } from 'react'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { superiorView: false, viewMode: 'hide' }
		this.elevateUp = this.elevateUp.bind( this )
		this.fallBack = this.fallBack.bind( this )
	}
	
	
	componentDidUpdate( ) {
		if ( this.state.viewMode === 'view' ) {
			this.props.viewHover( this )
		}
		else if ( this.state.superiorView && this.state.viewMode === 'hide' ) {
			this.setState( { superiorView: false } )
		}
	}
	
	animateMode( element, prefix, suffix ) {
		const alpha = element + ' ' + element + '-' + prefix
		const beta = element + ' ' + element + '-' + suffix
		if ( this.state.viewMode !== 'hide' ) {
			return this.state.superiorView ? alpha : beta
		}
		return element
	}
	
	elevateUp( ) {
		this.setState( { viewMode: 'view' } )
		this.props.viewHover( this )
	}
	
	fallBack( ) {
		setTimeout( ( ) => {
			this.setState( { superiorView: false, viewMode: 'hide' } )
		}, 500 )
		this.setState( { viewMode: 'fade' } )
		this.props.moveOff( this )
	}
	
	setPanel( ) {
		const price = this.props.image.price ? 'Price: $' + this.props.image.price : null
		const date = this.props.image.date ? 'Date: ' + this.props.image.date : null
		const animation = this.state.viewMode === 'view' ? 'image-panel-view' : 'image-panel-fade'
		if ( this.state.viewMode !== 'hide' && this.state.superiorView ) {
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
		const style = this.animateMode( 'image-box', 'upper', 'lower' )
		return (
			<div id={ this.props.rk } className="image-box" { ...events }>
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



