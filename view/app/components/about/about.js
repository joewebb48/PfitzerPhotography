



import React, { Component } from 'react'
import axios from 'axios'

import './about.css'



class About extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { artist: null }
	}
	
	
	componentDidMount( ) {
		axios.get( '/bio' ).then( bio => {
			console.log( bio )
			this.setState( { artist: bio.data } )
		} )
	}
	
	render( ) {
		const name = this.state.artist ? this.state.artist.fields.name : null
		const about = this.state.artist ? this.state.artist.fields.about : null
		// Needs additional style tinkering before image displays properly
		const portrait = this.state.artist ? this.state.artist.fields.portrait : ''
		return (
			<section className="about-section">
				<div className="about-border"/>
				<div id="about-portrait" className="about-frame">
					<h1> { name } </h1>
					<div className="about-image">
						<img src={ '/public/img/' + portrait }/>
						<div className="about-upper"/>
					</div>
				</div>
				<div className="about-distort"/>
				<div className="about-text">
					<p> { about } </p>
				</div>
				<div id="about-background" className="about-frame">
					<div className="about-image">
						<img src="/public/img/test1.jpg"/>
						<div className="about-lower"/>
					</div>
				</div>
			</section>
		)
	}
	
}


export default About


