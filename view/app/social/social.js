



import React, { Component } from 'react'
import axios from 'axios'

import './social.css'



class Social extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { status: undefined }
	}
	
	
	componentDidMount( ) {
		axios.get( '/social' ).then( status => {
			this.setState( { status: status.data.fields.active } )
		} )
	}
	
	render( ) {
		if ( !this.state.status ) {
			return null
		}
		return (
			<footer>
				Social Media
			</footer>
		)
	}
	
}


export default Social



