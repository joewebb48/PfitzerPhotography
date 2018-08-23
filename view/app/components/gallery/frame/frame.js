



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Panel from './panel/panel'
import './frame.css'



class Frame extends Component {
	
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
	
	render( ) {
		const url = this.props.url + '/' + this.props.image.name
		const image = 'public/' + this.props.image.image
		const props = { src: image, alt: this.props.image.description }
		const events = { onMouseEnter: this.elevateUp, onMouseLeave: this.fallBack }
		return (
			<div className="frame-area" { ...events }>
				<Link to={ { pathname: url, state: { image: this.props.image } } }>
					<div className="frame-shadow"></div>
					<div className="frame-image">
						<div className="frame-border"></div>
						<img className="frame-thumbnail" { ...props }/>
					</div>
				</Link>
				<Panel mode={ this.state.viewMode } image={ this.props.image }/>
			</div>
		)
	}
	
}


export default Frame


