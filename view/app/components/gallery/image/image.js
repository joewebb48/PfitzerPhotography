



import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		this.image = React.createRef( )
		this.state = { profile: null, none: undefined, scale: 'base' }
		this.zoomImage = this.zoomImage.bind( this )
	}
	
	
	componentDidMount( ) {
		if ( this.props.location.state ) {
			this.setState( { none: false } )
		}
		else {
			const url = { params: { url: this.props.location.pathname } }
			axios.get( '/image', url ).then( image => {
				this.setState( {
					profile: image.data ? image.data : null,
					none: !image.data ? true : false
				} )
			} )
		}
	}
	
	evalScale( ) {
		const height = this.image.current.naturalHeight > this.image.current.height
		const width = this.image.current.naturalWidth > this.image.current.width
		return this.state.scale !== 'base' || height || width
	}
	
	zoomImage( ) {
		const mode = this.state.scale === 'zoom' ? 'screen' : 'zoom'
		this.setState( { scale: this.evalScale( ) ? mode : 'base' } )
	}
	
	render( ) {
		if ( !this.state.profile && !this.props.location.state ) {
			return !this.state.none ? null : <Redirect to="/gallery"/>
		}
		// May refactor image path code to be at the start of the method
		const data = this.state.profile || this.props.location.state || null
		const summary = data ? data.fields ? data.fields : data.image : ''
		const image = '/public/' + summary.image
		const props = { ref: this.image, src: image }
		const events = { onLoad: this.zoomImage, onClick: this.zoomImage }
		// Cursors and resizing still may render improperly on page arrival
		const scale = this.state.scale === 'zoom' ? 'image-box-zoom' : 'image-box-screen'
		const form = !this.image.current || !this.evalScale( ) ? '' : ' ' + scale
		// Has occasional server-side rendering error that will need fixing
		return <img className={ 'image-box' + form } { ...props } { ...events }/>
	}
	
}


export default Image


