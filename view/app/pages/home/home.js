



import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Slide from '../../components/slide/slide'
import Media from '../../components/media/media'
import { getImages } from '../../actions/images'
import { mapImages } from '../../helpers/stateprops'
import './home.css'



class Home extends Component {
	
	static key = { api: '/social', params: { path: '/', exact: true } }
	
	
	constructor( props ) {
		super( props )
		this.state = { owner: null, links: [ ] }
	}
	
	
	static queryPhotos( store ) {
		return store.dispatch( getImages( ) )
	}
	
	componentDidMount( ) {
		const { api } = this.constructor.key
		this.constructor.key.load( api ).then( media => {
			console.log( media )
			this.setState( {
				owner: media.data.owner,
				links: media.data.links || [ ]
			} )
		} )
		this.props.getImages( )
	}
	
	render( ) {
		const props = { owner: this.state.owner, links: this.state.links }
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


export default connect( mapImages, { getImages } )( Home )



