



import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Navigator from '../navigator/navigator'
import Image from './image/image'
import './gallery.css'



class Gallery extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { images: [ ] }
	}
	
	
	componentDidMount( ) {
		axios.get( '/photos' ).then( images => {
			this.setState( { images: images.data } )
			// Generate a unique scaling css selector per image component
			this.generateLevels( )
		} )
	}
	
	viewGallery( ) {
		return this.state.images.map( image => {
			return <Image key={ image.pk } image={ image.fields }/>
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
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
				<div className="gallery-frame">
					{ this.viewGallery( ) }
				</div>
			</section>
		)
	}
	
}


export default Gallery


