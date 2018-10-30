



import React, { Component } from 'react'
import { connect } from 'react-redux'

import Slide from '../../components/slide/slide'
import { getImages } from '../../actions/images'
import './about.css'



class About extends Component {
	
	static key = { api: '/bio', params: { path: '/about' } }
	
	
	constructor( props ) {
		super( props )
		this.state = { artist: null }
	}
	
	
	static queryPhotos( store ) {
		return store.dispatch( getImages( ) )
	}
	
	componentDidMount( ) {
		const { api } = this.constructor.key
		this.constructor.key.load( api ).then( bio => {
			console.log( bio )
			this.setState( { artist: bio.data } )
		} )
		this.props.getImages( )
	}
	
	affixImage( view ) {
		const url = view ? view.fields.image : ''
		const image = this.state.artist ? '/public/' + url : null
		// Include alt text when rendering the jsx image element
		return image ? <img src={ image }/> : <div className="about-empty"/>
	}
	
	render( ) {
		const name = this.state.artist ? this.state.artist.fields.name : null
		const about = this.state.artist ? this.state.artist.fields.about : null
		const photo = this.state.artist ? this.state.artist.fields.image : ''
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


export default connect( data => ( { images: data.images } ), { getImages } )( About )


