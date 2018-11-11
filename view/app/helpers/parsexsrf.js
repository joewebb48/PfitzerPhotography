



// Might not need this method but will keep here for now



export default function( token ) {
	const jar = document.cookie.split( ';' )
	const run = exe => jar.reduce( exe, '' )
	// Locate the current xsrf token using cookies for later
	return run( ( model, cookie ) => {
		let match = cookie.trim( ).startsWith( token )
		return match ? cookie.split( '=' )[ 1 ] : model
	} )
}


