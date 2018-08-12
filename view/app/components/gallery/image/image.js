



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
			}, 250 )
		}
	}
	
	fallBack( ) {
		if ( this.state.viewMode !== 'hide' ) {
			setTimeout( ( ) => {
				// Disallow panel hiding if it is being viewed again
				if ( this.state.viewMode !== 'view' ) {
					this.setState( { viewMode: 'hide' } )
				}
			}, 750 )
			this.setState( { viewMode: 'fade' } )
		}
	}
	
	setPanel( ) {
		const price = this.props.image.price ? 'Price: $' + this.props.image.price : null
		const date = this.props.image.date ? 'Date: ' + this.props.image.date : null
		const animation = this.state.viewMode === 'view' ? 'image-panel-view' : 'image-panel-fade'
		return this.state.viewMode === 'hide' ? null : (
			<div className={ 'image-panel ' + animation }>
				<h3> { this.props.image.name } </h3>
				{ /* <h5> Category </h5> */ }
				<p> { this.props.image.description } </p>
				<span className="image-price"> { price } </span>
				<span className="image-date"> { date } </span>
			</div>
		)
	}
	
	render( ) {
		const url = this.props.url + '/' + this.props.image.name
		const image = 'public/' + this.props.image.image
		const events = { onMouseEnter: this.elevateUp, onMouseLeave: this.fallBack }
		return (
			<div className="image-area" { ...events }>
				<Link to={ { pathname: url, state: { image: '/' + image } } }>
					<div className="image-shadow"></div>
					<div className="image-frame">
						<div className="image-border"></div>
						<img className="image-thumbnail" src={ image }/>
					</div>
				</Link>
				{ this.setPanel( ) }
			</div>
		)
	}
	
}


export default Image



