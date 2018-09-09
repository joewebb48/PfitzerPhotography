



import axios from 'axios'



export const photo = 'photo'


export function getPhotos( ) {
	// Necessary to return an inner async function here to operate
	return async relay => {
		try {
			const gallery = await axios.get( '/photos' )
			console.log( 'Action success!\n', gallery )
			// Execute the Redux argument function on the gallery data
			relay( { type: photo, feedback: gallery } )
		}
		catch ( error ) {
			console.log( 'Error in action!\n' )
		}
	}
}


