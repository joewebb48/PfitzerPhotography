



import React, { Component } from 'react'
import axios from 'axios'

import Navigator from '../navigator/navigator'
import './about.css'



class About extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { name: '', about: '' }
	}
	
	
	componentDidMount( ) {
		axios.get( '/bio' ).then( content => {
			console.log( content )
			content.data.filter( text => {
				this.setState( {
					name: text.fields.label === 'name' ? text.fields.text : this.state.name,
					about: text.fields.label === 'about' ? text.fields.text : this.state.about
				} )
			} )
		} )
	}
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
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


