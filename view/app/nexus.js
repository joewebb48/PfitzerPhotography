



import axios from 'axios'

import Home from './components/home/home'
import About from './components/about/about'
import Gallery from './components/gallery/gallery'
import Contact from './components/contact/contact'



export default function( url, net ) {
	const id = { params: { url: url } }
	// Root level routes are needed for route key params
	const web = !net ? [ Home, About, Gallery, Contact ] : net
	return web.map( route => {
		let { api, params } = route.key
		// Data loading will use this predefined api function
		let load = async ( url, data ) => await axios.get( url, data )
		let meta = { api, load, route: { component: route, ...params } }
		// Might only desire subroute assembly server-side
		let server = typeof document === 'undefined'
		if ( route.key.routes ) {
			// Aggregate any subroute metadata recursively
			meta[ 'interior' ] = this.bind( this )( url, route.key.routes )
		}
		// Each route will need data loading in the browser
		route.key.load = load
		return meta
	} )
}


