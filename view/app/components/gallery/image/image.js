



import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		const id = props.staticContext ? props.staticContext : null
		this.image = React.createRef( )
		this.state = { profile: id, none: undefined, scale: 'base' }
		this.zoomImage = this.zoomImage.bind( this )
	}
	
	
	componentDidMount( ) {
		if ( this.props.location.state ) {
			this.setState( { none: false } )
		}
		else {
			const url = { params: { url: this.props.location.pathname } }
			// Server-side data loading of static context may replace axios
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
		const resize = this.state.scale !== 'base' || this.image.current.className !== 'image-box'
		const fixed = this.state.scale === 'base' && !height && !width
		return resize ? resize : !fixed
	}
	
	zoomImage( ) {
		const scale = this.state.scale === 'zoom' ? 'screen' : 'zoom'
		this.setState( { scale: this.evalScale( ) ? scale : 'base' } )
	}
	
	render( ) {
		if ( !this.state.profile && !this.props.location.state ) {
			return !this.state.none ? null : <Redirect to="/gallery"/>
		}
		// May refactor image path code to be at the start of the method
		const data = this.state.profile || this.props.location.state || null
		const summary = data ? data.fields ? data.fields : data.image : ''
		const image = '/public/' + summary.image
		const props = { ref: this.image, src: image, alt: summary.description }
		const events = { onLoad: this.zoomImage, onClick: this.zoomImage }
		// Initial reloads sometimes display the wrong cursor zoom icon
		const breadth = this.state.scale === 'zoom' ? 'image-box-zoom' : 'image-box-screen'
		const zoom = this.image.current && this.evalScale( ) ? ' ' + breadth : ''
		// Has occasional server-side rendering error that will need fixing
		return <img className={ 'image-box' + zoom } { ...props } { ...events }/>
	}
	
}


export default Image


