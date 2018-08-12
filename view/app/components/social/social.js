



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
			this.setState( { links: media.data } )
		} )
	}
	
	injectLinks( ) {
		return this.state.links.map( link => {
			const url = 'public/' + link.fields.icon
			return (
				<a key={ link.pk } href={ link.fields.url }>
					<img className="social-icon" src={ url }/>
				</a>
			)
		} )
	}
	
	render( ) {
		return this.state.links.length < 1 ? null : (
			<footer>
				<h3 className="social-title"> Social Media </h3>
				{ this.injectLinks( ) }
			</footer>
		)
	}
	
}


export default Social



