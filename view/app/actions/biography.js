



import axios from 'axios'



export const biography = 'biography'


export function getBiography( ) {
	// Necessary to return an inner async function here to operate
	return async relay => {
		try {
			// Must use the full non-rendering server url on the server
			const admin = await axios.get( 'http://localhost:8000/bio' )
			console.log( 'Biography action success!\n\n' )
			// Execute the Redux argument function with the bio data
			relay( { type: biography, feedback: admin } )
		}
		catch ( error ) {
			console.error( 'Error in Biography action!\n\n' )
		}
	}
}



