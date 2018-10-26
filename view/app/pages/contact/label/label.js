



import React, { Component } from 'react'



class Label extends Component {
	
	constructor( props ) {
		super( props )
		this.state = {  }
	}
	
	
	generateProps( field, props ) {
		// Ignore non-component and preassigned field props
		const ignore = [ 'html', 'class', 'text', 'value', 'error' ]
		const query = attr => ignore.every( key => attr[ 0 ] !== key )
		// Fuse together the new props with the screened set
		const join = ( body, attr ) => ( { ...body, [ attr[ 0 ] ]: attr[ 1 ] } )
		return props.filter( query ).reduce( join, field )
	}
	
	calculateField( attrs ) {
		const field = { className: attrs.class, value: attrs.value || '' }
		const props = this.generateProps( field, Object.entries( attrs ) )
		console.log( '\nField:', props )
		return React.createElement( this.props.html, props )
	}
	
	render( ) {
		return (
			<label>
				{ this.props.text }
				{ this.calculateField( this.props ) }
				<span> { this.props.error } </span>
			</label>
		)
	}
	
}


export default Label



