



// Function exports for mapping global state in Redux to props



export function mapImages( data ) {
	return { images: data.images }
}

export function mapBiography( data ) {
	return { biography: data.biography }
}

export function mapUniversal( data ) {
	return { biography: data.biography, images: data.images }
}


