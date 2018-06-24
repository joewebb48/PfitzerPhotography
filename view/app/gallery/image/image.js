



import React, { Component } from 'react'

import './image.css'



class Image extends Component {
	
	render( ) {
		const url = 'root/' + this.props.image.image
		console.log( url )
		console.log( this.props.image )
		return (
			<div className="image-frame">
				<img className="image-thumbnail" src={ url }/>
			</div>
		)
	}
	
}


export default Image


