



import React, { Component } from 'react'



class Label extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { flash: false }
	}
	
	
	componentDidUpdate( ) {
		if ( this.props.error && this.props.sent ) {
			console.log( 'Sent:', this.props.sent, this.error ? true : false )
			// Expose and eventually fade out all errors shown
			this.setState( { flash: true } )
			this.error = setTimeout( ( ) => {
				this.setState( { flash: false } )
			}, this.props.diff )
		}
	}
	
	componentWillUnmount( ) {
		clearTimeout( this.error )
	}
	
	generateProps( field, props ) {
		// Ignore non-component and preassigned field props
		const ignore = [ 'html', 'text', 'value', 'error', 'sent', 'diff' ]
		const query = attr => ignore.every( key => attr[ 0 ] !== key )
		// Fuse together the new props with the screened set
		const join = ( body, attr ) => ( { ...body, [ attr[ 0 ] ]: attr[ 1 ] } )
		return props.filter( query ).reduce( join, field )
	}
	
	calculateField( attrs ) {
		const field = { className: attrs.class, value: attrs.value || '' }
		const props = this.generateProps( field, Object.entries( attrs ) )
		return React.createElement( this.props.html, props )
	}
	
	flashError( error ) {
		// Not resetting error durations if form is resubmitted
		const shroud = !this.state.flash
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



