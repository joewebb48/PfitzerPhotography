



import React, { Component } from 'react'
import axios from 'axios'

import './about.css'



class About extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { name: '', about: '' }
	}
	
	
	componentDidMount( ) {
		axios.get( '/bio' ).then( bio => {
			console.log( bio )
			this.setState( {
				name: bio.data.fields.name,
				about: bio.data.fields.about
			} )
		} )
	}
	
	render( ) {
		return (
			<section>
				<div className="about-frame">
					<h1> { this.state.name } </h1>
					<div className="about-image about-portrait"/>
					<div className="about-bio">
						<div className="about-text">
							<p> { this.state.about } </p>
						</div>
						<div className="about-image about-image-top"/>
						<div className="about-image about-image-bottom"/>
					</div>
				</div>
			</section>
		)
	}
	
}


export default About


