



import React, { Component } from 'react'

import './media.css'



class Media extends Component {
	
	injectLinks( ) {
		return this.props.links.map( link => {
			const url = '/root/' + link.fields.icon
			return (
				<a key={ link.pk } href={ link.fields.url }>
					<img className="social-icon" src={ url }/>
				</a>
			)
		} )
	}
	
	render( ) {
		const year = new Date( ).getFullYear( )
		const artist = this.props.owner ? this.props.owner.name : ''
		const github = this.props.owner ? this.props.owner.developer : ''
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


export default Media



