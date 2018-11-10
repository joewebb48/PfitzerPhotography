



import React, { Component } from 'react'
import { connect } from 'react-redux'

import Slide from '../../components/slide/slide'
import { getBiography } from '../../actions/biography'
import { getImages } from '../../actions/images'
import { mapUniversal } from '../../helpers/stateprops'
import './about.css'



class About extends Component {
	
	static key = { api: [ getBiography, getImages ], params: { path: '/about' } }
	
	
	constructor( props ) {
		super( props )
	}
	
	
	componentDidMount( ) {
		this.props.getBiography( )
		// Only load a new set of data if it doesn't exist already
		this.props.images.length ? null : this.props.getImages( )
	}
	
	affixImage( view ) {
		const url = view ? view.fields.image : ''
		const image = this.props.biography.fields ? '/public/' + url : null
		// Include alt text when rendering the jsx image element
		return image ? <img src={ image }/> : <div className="about-empty"/>
	}
	
	render( ) {
		const biography = this.props.biography.fields
		const name = biography ? biography.name : ''
		const about = biography ? biography.about : ''
		const photo = biography ? biography.image : ''
		// Mask-image browser compatability issues need fixes
		return (
			<section>
				<div className="about-border"/>
				<div className="about-portrait">
					<h1> { name } </h1>
					<div className="about-image">
						{ this.affixImage( photo ) }
					</div>
				</div>
				{ /* <div className="about-distort"/> */ }
				<div className="about-background">
					<div className="about-text">
						<p> { about } </p>
					</div>
					<Slide images={ this.props.images }/>
				</div>
			</section>
		)
	}
	
}


export default connect( mapUniversal, { getBiography, getImages } )( About )



