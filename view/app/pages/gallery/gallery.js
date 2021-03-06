



import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Image from './image/image'
import Frame from './frame/frame'
import { getImages } from '../../actions/images'
import { mapImages } from '../../helpers/stateprops'
import './gallery.css'



class Gallery extends Component {
	
	static key = { api: [ getImages ], params: { path: '/gallery' }, routes: [ Image ] }
	
	
	constructor( props ) {
		super( props )
	}
	
	
	componentDidMount( ) {
		// Retrieve any necessary data if it hasn't already been generated
		this.props.images.length ? null : this.props.getImages( )
	}
	
	componentDidUpdate( ) {
		// Generate every z-index css selector for each image component
		this.generateLevels( )
	}
	
	formGallery( ) {
		return this.props.images.map( image => {
			let props = { url: this.props.match.url, image: image.fields }
			return <Frame key={ image.pk } { ...props }/>
		} )
	}
	
	viewNone( ) {
		return <p className="gallery-empty"> The gallery is empty! </p>
	}
	
	generateLevels( ) {
		const css = ReactDOM.createPortal( <></>, document.styleSheets[ 0 ].ownerNode )
		const styles = css.containerInfo.sheet
		this.props.images.forEach( ( img, idx ) => {
			let iterator = '.frame-area:nth-last-child( ' + ( idx + 1 ) + ' )'
			let zidstyle = iterator + ' { z-index: ' + ( idx + 5 ) + '; }'
			styles.insertRule( zidstyle, styles.cssRules.length )
			// Alternative method for embedding new css stylesheet rules
			/* let select = zidstyle.slice( 0, rank.toString( ).length + 2 )
			let primacy = zidstyle.slice( rank.toString( ).length + 5, zidstyle.length - 2 )
			styles.addRule( select, primacy, styles.cssRules.length ) */
		} )
	}
	
	isUnknown( ) {
		const action = this.props.history.action.toLowerCase( )
		// Only appears after redirects as they default to a replace action
		return action !== 'replace' ? null : (
			<div className="gallery-redirect"> That image doesn't exist! </div>
		)
	}
	
	render( ) {
		const url = this.props.match.path + '/:image'
		const gallery = this.props.match.url === this.props.location.pathname
		if ( gallery ) {
			return (
				<section>
					{ this.isUnknown( ) }
					{ this.props.images.length ? this.formGallery( ) : this.viewNone( ) }
				</section>
			)
		}
		return <Route path={ url } component={ Image }/>
	}
	
}


export default connect( mapImages, { getImages } )( Gallery )



