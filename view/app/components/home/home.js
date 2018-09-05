



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Social from '../social/social'
import './home.css'



class Home extends Component {
	
	static key = { api: '/social', params: { path: '/', exact: true } }
	
	
	render( ) {
		return (
			<section>
				<div className="home-portal">
					<Link to="/gallery">
						<div className="home-border"/>
						<img className="home-img" alt="image"/>
					</Link>
				</div>
				<Social url={ this.props.location.pathname }/>
			</section>
		)
	}
	
}


export default Home


