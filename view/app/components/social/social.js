



import React, { Component } from 'react'

import './social.css'



class Social extends Component {
	
	injectLinks( ) {
		return this.props.links.map( link => {
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
		const artist = this.props.owner ? this.props.owner.fields.name : null
		const github = this.props.owner ? this.props.owner.fields.developer : null
		return (
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



