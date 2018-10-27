



import React, { Component } from 'react'



class Label extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { flash: false }
	}
	
	
	componentDidUpdate( ) {
		if ( this.props.error && !this.state.flash ) {
			// Expose and eventually fade out all errors shown
			this.setState( { flash: true } )
			this.error = setTimeout( ( ) => {
				this.setState( { flash: false } )
			}, 12000 )
		}
	}
	
	componentWillUnmount( ) {
		clearTimeout( this.error )
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
	
	flashError( error ) {
		// Not rendering appropriately after error text is faded
		const shroud = !this.state.flash && error
		return shroud ? null : <p> { error } </p>
	}
	
	render( ) {
		return (
			<label>
				{ this.props.text }
				{ this.calculateField( this.props ) }
				{ this.flashError( this.props.error ) }
			</label>
		)
	}
	
}


export default Label



