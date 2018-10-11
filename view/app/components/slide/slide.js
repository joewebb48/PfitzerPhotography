



import React, { Component } from 'react'



class Slide extends Component {
	
	viewNext( ) {
		setInterval( ( ) => {
			// Image filtering and selection will be done here
		}, 6000 )
	}
	
	render( ) {
		const image = ''
		return <img src={ image } alt=""/>
	}
	
}


export default Slide


