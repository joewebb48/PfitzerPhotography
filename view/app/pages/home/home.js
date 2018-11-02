



import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import Slide from '../../components/slide/slide'
import Media from '../../components/media/media'
import { getBiography } from '../../actions/biography'
import { getImages } from '../../actions/images'
import { mapUniversal } from '../../helpers/stateprops'
import './home.css'



class Home extends Component {
	
	static key = { api: [ getBiography, getImages ], params: { path: '/', exact: true } }
	
	
	constructor( props ) {
		super( props )
		this.state = { links: [ ] }
	}
	
	
	componentDidMount( ) {
		this.props.getBiography( )
		this.props.getImages( )
		// Modify the social api route to exclusively return links
		axios.get( '/social' ).then( media => {
			console.log( media )
			this.setState( { links: media.data.links || [ ] } )
		} )
	}
	
	render( ) {
		const owner = this.props.biography.fields
		const props = { owner, links: this.state.links }
		return (
			<section>
				<div className="home-portal">
					<Link to="/gallery">
						<div className="home-border"/>
						<Slide images={ this.props.images }/>
					</Link>
				</div>
				<Media { ...props }/>
			</section>
		)
	}
	
}


export default connect( mapUniversal, { getBiography, getImages } )( Home )


