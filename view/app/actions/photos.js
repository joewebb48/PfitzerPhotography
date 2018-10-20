



import axios from 'axios'



export const photo = 'photo'


export function getPhotos( ) {
	// Necessary to return an inner async function here to operate
	return async relay => {
		try {
			// Must use the full non-rendering server url on the server
			const gallery = await axios.get( 'http://localhost:8000/photos' )
			console.log( 'Action success!\n\n' )
			// Execute the Redux argument function with gallery data
			relay( { type: photo, feedback: gallery } )
		}
		catch ( error ) {
			console.log( 'Error in action!\n\n' )
		}
	}
}



