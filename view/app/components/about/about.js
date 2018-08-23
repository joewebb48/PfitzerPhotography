



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
			<section className="about-section">
				<div className="about-border"/>
				<div id="about-portrait" className="about-frame">
					<h1> { this.state.name } </h1>
					<div className="about-image">
						<img/>
						<div className="about-upper"/>
					</div>
				</div>
				<div className="about-distort"/>
				<div id="about-biography" className="about-frame">
					<div className="about-text">
						<p> { this.state.about } </p>
					</div>
					<div className="about-image">
						<img/>
						<div className="about-lower"/>
					</div>
				</div>
			</section>
		)
	}
	
}


export default About



