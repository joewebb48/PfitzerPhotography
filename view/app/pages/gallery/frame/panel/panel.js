



import React, { Component } from 'react'

import './panel.css'



class Panel extends Component {
	
	render( ) {
		const price = this.props.image.price ? 'Price: $' + this.props.image.price : null
		const date = this.props.image.date ? 'Date: ' + this.props.image.date : null
		const mode = this.props.mode === 'view' ? 'panel-slide-view' : 'panel-slide-fade'
		return this.props.mode === 'hide' ? null : (
			<div className={ 'panel-slide' + ' ' + mode }>
				<h3> { this.props.image.name } </h3>
				{ /* <h5> Category </h5> */ }
				<p> { this.props.image.description } </p>
				<span className="panel-price"> { price } </span>
				<span className="panel-date"> { date } </span>
			</div>
		)
	}
	
}


export default Panel


