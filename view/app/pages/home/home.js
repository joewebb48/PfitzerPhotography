



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
	
	
	async componentDidMount( ) {
		const volume = Object.keys( this.props.biography )
		// Load a new batch of data if it doesn't exist already
		volume.length ? null : await this.props.getBiography( )
		this.props.images.length ? null : this.props.getImages( )
		// May move to Media component as it isn't used here
		const biography = this.props.biography.fields
		const social = biography ? biography.social : false
		const enabled = { params: { enabled: social } }
		axios.get( '/social', enabled ).then( media => {
			this.setState( { links: media.data || [ ] } )
		} )
	}
	
	render( ) {
		const owner = this.props.biography.fields
		return (
			<section>
				<div className="home-portal">
					<Link to="/gallery">
						<div className="home-border"/>
						<Slide images={ this.props.images } default={ { x: 850, y: 500 } }/>
					</Link>
				</div>
				<Media owner={ owner } links={ this.state.links }/>
			</section>
		)
	}
	
}


export default connect( mapUniversal, { getBiography, getImages } )( Home )



