



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
	
	affixImage( id, url ) {
		const level = 'about-' + id
		// Temporary values until images are fully customizable
		const misc = url ? url : 'test1.jpg'
		const image = this.state.artist ? '/public/img/' + misc : null
		return image ? <img src={ image }/> : <div className={ level }/>
	}
	
	render( ) {
		const name = this.state.artist ? this.state.artist.fields.name : null
		const about = this.state.artist ? this.state.artist.fields.about : null
		const photo = this.state.artist ? this.state.artist.fields.portrait : ''
		return (
			<section className="about-section">
				<div className="about-border"/>
				<div id="about-portrait" className="about-frame">
					<h1> { name } </h1>
					<div className="about-image">
						{ this.affixImage( 'upper', photo ) }
					</div>
				</div>
				{ /* <div className="about-distort"/> */ }
				<div id="about-background" className="about-frame">
					<div className="about-text">
						<p> { about } </p>
					</div>
					<div className="about-image">
						{ this.affixImage( 'lower' ) }
					</div>
				</div>
			</section>
		)
	}
	
}


export default About



