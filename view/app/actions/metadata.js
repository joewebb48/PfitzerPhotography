



import axios from 'axios'



export const metadata = 'metadata'


export const getMetadata = ( ) => async relay => {
	const webpage = await axios.get( '/tag' )
	relay( {
		type: metadata,
		data: webpage
	} )
}



