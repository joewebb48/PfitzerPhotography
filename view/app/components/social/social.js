



import React, { Component } from 'react'
import axios from 'axios'

import './social.css'



class Social extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { owner: null, links: [ ] }
	}
	
	
	componentDidMount( ) {
		// Move this to a route page component
		axios.get( '/social' ).then( media => {
			console.log( media )
			this.setState( {
				owner: media.data.owner,
				links: media.data.links || [ ]
			} )
		} )
	}
	
	injectLinks( ) {
		return this.state.links.map( link => {
			const url = '/public/' + link.fields.icon
			return (
				<a key={ link.pk } href={ link.fields.url }>
					<img className="social-icon" src={ url }/>
				</a>
			)
		} )
	}
	
	render( ) {
		const year = new Date( ).getFullYear( )
		const artist = this.state.owner ? this.state.owner.fields.name : null
		const github = this.state.owner ? this.state.owner.fields.developer : null
		return this.props.url !== '/' ? null : (
			<footer>
				{ this.injectLinks( ) }
				<address>
					<span>
						&#169; <time dateTime={ year }> { year } </time> { artist } Photography
					</span>
					<a href={ github }> Website by Ian Peterson </a>
				</address>
			</footer>
		)
	}
	
}


export default Social



