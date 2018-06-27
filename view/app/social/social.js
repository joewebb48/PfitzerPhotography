



import React, { Component } from 'react'
import axios from 'axios'

import './social.css'



class Social extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { status: undefined, links: [ ] }
	}
	
	
	componentDidMount( ) {
		axios.get( '/social' ).then( status => {
			console.log( status )
			this.setState( {
				status: status.data.status.fields.active,
				links: status.data.icons
			} )
		} )
	}
	
	insertLinks( ) {
		return this.state.links.map( link => {
			const url = 'root/' + link.fields.icon
			return (
				<a key={ link.pk } href={ link.fields.url }>
					<img className="social-icon" src={ url }/>
				</a>
			)
		} )
	}
	
	render( ) {
		if ( !this.state.status ) {
			return null
		}
		return (
			<footer>
				<h3 className="social-title"> Social Media </h3>
				{ this.insertLinks( ) }
			</footer>
		)
	}
	
}


export default Social



