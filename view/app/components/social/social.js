



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
		// Will need updating so values are generated dynamically
		const year = 2018
		const artist = 'Ursula Pfitzer'
		const github = 'https://github.com/Xoadra'
		return this.state.links.length < 1 || this.props.url !== '/' ? null : (
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


