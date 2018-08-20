



import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import './image.css'



class Image extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { profile: null, none: undefined }
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
	
	render( ) {
		if ( !this.state.profile && !this.props.location.state ) {
			return !this.state.none ? null : <Redirect to="/gallery"/>
		}
		const data = this.state.profile || this.props.location.state
		const summary = data.fields ? data.fields : data.image
		const image = '/public/' + summary.image
		// Has occasional server-side rendering error that will need fixing
		return <img className="image-fill" src={ image }/>
	}
	
}


export default Image



