



import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import Image from './image/image'
import './gallery.css'



class Gallery extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { images: [ ], isolate: null }
	}
	
	
	componentDidMount( ) {
		const url = { params: { url: this.props.location.pathname } }
		axios.get( '/photos', url ).then( images => {
			// Image data is necessary if an image is visited directly via url
			let { isolate } = images.data
			let extant = url.params.url === '/gallery' ? null : undefined
			this.setState( {
				images: images.data.gallery,
				isolate: isolate ? isolate.fields : extant
			} )
			// Generate a unique scaling css selector per image component
			this.generateLevels( )
		} )
	}
	
	componentDidUpdate( ) {
		if ( this.props.location.state ) {
			const isolate = this.state.isolate
			const photo = this.props.location.state.image
			// Update with the image data of the new image being viewed
			if ( !isolate || isolate.name !== photo.name ) {
				this.setState( { isolate: photo } )
			}
		}
		if ( this.state.isolate === undefined ) {
			this.setState( { isolate: null } )
		}
	}
	
	formGallery( ) {
		return this.state.images.map( image => {
			let props = { url: this.props.match.url, image: image.fields }
			return <Image key={ image.pk } { ...props }/>
		} )
	}
	
	generateLevels( ) {
		const css = ReactDOM.createPortal( <></>, document.styleSheets[ 0 ].ownerNode )
		const styles = css.containerInfo.sheet
		this.state.images.forEach( ( img, idx ) => {
			let iterator = '.image-area:nth-last-child( ' + ( idx + 1 ) + ' )'
			let zidstyle = iterator + ' { z-index: ' + ( idx + 5 ) + '; }'
			styles.insertRule( zidstyle, styles.cssRules.length )
			// Alternative method for embedding new css stylesheet rules
			/* let select = zidstyle.slice( 0, rank.toString( ).length + 2 )
			let primacy = zidstyle.slice( rank.toString( ).length + 5, zidstyle.length - 2 )
			styles.addRule( select, primacy, styles.cssRules.length ) */
		} )
	}
	
	viewImage( ) {
		if ( this.state.isolate === undefined ) {
			return <Redirect to={ { pathname: '/gallery' } }/>
		}
		const image = this.state.isolate ? '/public/' + this.state.isolate.image : ''
		// Has occasional server-side rendering error that will need fixing
		return <img className="gallery-image" src={ image }/>
	}
	
	render( ) {
		const url = this.props.match.path + '/:image'
		return (
			<section>
				<Route exact path={ this.props.match.url } render={ ( ) => <>
					<div className="gallery-frame">
						{ this.formGallery( ) }
					</div>
				</> }/>
				<Route path={ url } render={ ( ) => this.viewImage( ) }/>
			</section>
		)
	}
	
}


export default Gallery


