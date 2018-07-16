



import React, { Component } from 'react'
import axios from 'axios'

import './social.css'



class Social extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { links: [ ] }
	}
	
	
	componentDidMount( ) {
		axios.get( '/social' ).then( media => {
			console.log( media )
			this.setState( {
				links: media.data
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
		if ( this.state.links.length < 1 ) {
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


