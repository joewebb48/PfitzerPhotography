



import axios from 'axios'



export const image = 'photo'


export function getImages( ) {
	// Necessary to return an inner async function here to operate
	return async relay => {
		try {
			// Must use the full non-rendering server url on the server
			const gallery = await axios.get( 'http://localhost:8000/photos' )
			console.log( 'Images action success!\n\n' )
			// Execute the Redux argument function with gallery data
			relay( { type: image, feedback: gallery } )
		}
		catch ( error ) {
			console.error( 'Error in Images action!\n\n' )
		}
	}
}



