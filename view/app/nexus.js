



import axios from 'axios'

import Home from './components/home/home'
import About from './components/about/about'
import Gallery from './components/gallery/gallery'
import Contact from './components/contact/contact'



export default function( location ) {
	const url = { params: { url: location } }
	// Root level routes needed for route key params
	const routes = [ Home, About, Gallery, Contact ]
	return routes.map( route => {
		let { api, params } = route.key
		// Data loading will use this predefined function
		let load = async ( url, data ) => await axios.get( url, data )
		// Each route needs this function in the browser
		route.key.load = load
		return { api, load, route: { component: route, ...params } }
	} )
}



