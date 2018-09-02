



import axios from 'axios'



export const photo = 'photo'


export async function getPhotos( relay ) {
	const gallery = await axios.get( '/photos' )
	// Execute the Redux argument function on the gallery data
	relay( { type: photo, feedback: gallery } )
}



