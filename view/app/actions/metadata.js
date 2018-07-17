



import axios from 'axios'



export const metadata = 'metadata'


export async function getMetadata( ) {
	const tags = await axios.get( '/tag' )
	return {
		type: metadata,
		feedback: tags
	}
}



