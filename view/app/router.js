



import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Title from './title/title'
import Home from './home/home'
import Gallery from './gallery/gallery'



class Router extends Component {
	
	render( ) {
		return (
			<section>
				<Title/>
				<Route exact path='/' component={ Home }/>
				<Route path='/gallery' component={ Gallery }/>
			</section>
		)
	}
	
}


export default Router


