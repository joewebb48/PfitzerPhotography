



import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Navigator from '../navigator/navigator'
import Image from './image/image'
import './gallery.css'



class Gallery extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { images: [ ], view: null }
		this.viewHover = this.viewHover.bind( this )
		this.moveOff = this.moveOff.bind( this )
	}
	
	
	componentDidMount( ) {
		axios.get( '/photos' ).then( images => {
			this.setState( { images: images.data } )
			// Generate a unique css id selector for each image component
			this.applyLevels( )
		} )
	}
	
	populateFrame( ) {
		let rank = 1
		return this.state.images.map( image => {
			let props = { rk: 'z' + rank++, image: image.fields }
			let events = { viewHover: this.viewHover, moveOff: this.moveOff }
			return <Image key={ image.pk } { ...props } { ...events }/>
		} )
	}
	
	viewHover( frame ) {
		if ( !this.state.view ) {
			console.log( '\nHovering!', frame.props.rk )
			frame.setState( { superiorView: true } )
			this.setState( { view: frame } )
		}
		// Old code preserved for viewing multiple panels simultaneously
		/* else {
			if ( frame.state.viewMode === 'view' ) {
				console.log( '\nHovering with new!', frame.props.rk, this.state.view.props.rk )
				if ( frame.props.rk < this.state.view.props.rk && this.state.view.state.superiorView ) {
					this.state.view.setState( { superiorView: false } )
				}
			}
			if ( frame !== this.state.view && frame.state.superiorView === this.state.view.state.superiorView ) {
				console.log( 'Now:', frame.props.rk, 'Then:', this.state.view.props.rk )
				let superior = frame.props.rk < this.state.view.props.rk
				frame.setState( { superiorView: superior ? true : false } )
				this.state.view.setState( { superiorView: superior ? false : true } )
				this.setState( { view: frame } )
			}
		} */
	}
	
	moveOff( frame ) {
		console.log( 'Leaving!', frame.props.rk, this.state.view ? this.state.view.props.rk : null )
		if ( frame === this.state.view ) {
			setTimeout( ( ) => {
				if ( frame === this.state.view && frame.state.viewMode === 'hide' ) {
					console.log( 'Undone!', frame.props.rk, '\n' )
					this.setState( { view: null } )
				}
				else {
					console.log( 'Viewing another!', this.state.view.props.rk )
				}
			}, 500 )
			console.log( 'Waiting...' )
		}
	}
	
	applyLevels ( ) {
		const node = ReactDOM.createPortal( <></>, document.styleSheets[ 0 ].ownerNode )
		const css = node.containerInfo.sheet
		console.log( css )
		this.state.images.forEach( ( img, idx ) => {
			let rank = idx + 1
			let level = this.state.images.length + 3 - idx
			let zidstyle = '#z' + rank + ' { ' + 'z-index: ' + level + '; }'
			css.insertRule( zidstyle, css.cssRules.length )
			// Alternative method for embedding new css stylesheet rules
			/* let select = zidstyle.slice( 0, rank.toString( ).length + 2 )
			let primacy = zidstyle.slice( rank.toString( ).length + 5, zidstyle.length - 2 )
			css.addRule( select, primacy, css.cssRules.length ) */
		} )
	}
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
				<div className="gallery-frame">
					{ this.populateFrame( ) }
				</div>
			</section>
		)
	}
	
}


export default Gallery



