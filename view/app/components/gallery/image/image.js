



import React, { Component } from 'react'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { superiorView: false, viewMode: 'hide' }
		this.view = this.togglePanel.bind( this )
		this.hide = this.hidePanel.bind( this )
	}
	
	
	componentDidUpdate( ) {
		if ( this.state.superiorView && this.state.viewMode === 'hide' ) {
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
	
	togglePanel( ) {
		// Prevent adding z-indexes until all other panels are hidden
		this.setState( { superiorView: true, viewMode: 'view' } )
	}
	
	hidePanel( ) {
		setTimeout( ( ) => {
			this.setState( { superiorView: false, viewMode: 'hide' } )
		}, 500 )
		this.setState( { viewMode: 'fade' } )
	}
	
	openPanel( ) {
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
		const events = { onMouseEnter: this.view, onMouseLeave: this.hide }
		//console.log( url )
		//console.log( this.props.image )
		const style = this.animateMode( 'image-box', 'upper', 'lower' )
		return (
			<div id={ this.props.rk } className={ style } { ...events }>
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



