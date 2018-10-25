



import { matchPath } from 'react-router'
import axios from 'axios'

import Home from './home/home'
import About from './about/about'
import Gallery from './gallery/gallery'
import Contact from './contact/contact'



export default function( url, net ) {
	// Root level routes are needed for route key params
	const web = !net ? [ Home, About, Gallery, Contact ] : net
	const graph = exe => web.reduce( exe, [ ] )
	return graph( ( amal, route ) => {
		let { api, params } = route.key
		// Data loading will use this predefined api function
		let load = async ( url, data ) => await axios.get( url, data )
		let meta = { api, load, route: { component: route, ...params } }
		// Might only desire subroute assembly server-side
		let enviro = typeof document === 'undefined'
		if ( route.key.routes ) {
			// Aggregate any subroute metadata recursively
			meta[ 'interior' ] = this.bind( this )( url, route.key.routes )
		}
		// Setup server-side data fetching via passing a url
		if ( url ) {
			let set = matchPath( url, params )
			// Temporary method for running a Redux action
			let query = route.queryPhotos ? route.queryPhotos : null
			let chain = [ { api, load, query } ].concat( meta[ 'interior' ] || [ ] )
			return amal.concat( set ? chain : [ ] )
		}
		// Each route will need data loading in the browser
		api ? route.key.load = load : null
		return amal.concat( meta )
	} )
}



