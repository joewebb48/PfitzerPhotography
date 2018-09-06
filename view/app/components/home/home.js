



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Social from '../social/social'
import './home.css'



class Home extends Component {
	
	static key = { api: '/social', params: { path: '/', exact: true } }
	
	
	constructor( props ) {
		super( props )
		this.state = { owner: null, links: [ ] }
	}
	
	
	componentDidMount( ) {
		this.constructor.key.load( '/social' ).then( media => {
			console.log( media )
			this.setState( {
				owner: media.data.owner,
				links: media.data.links || [ ]
			} )
		} )
	}
	
	render( ) {
		const props = { owner: this.state.owner, links: this.state.links }
		return (
			<section>
				<div className="home-portal">
					<Link to="/gallery">
						<div className="home-border"/>
						<img className="home-img" alt="image"/>
					</Link>
				</div>
				<Social { ...props }/>
			</section>
		)
	}
	
}


export default Home



