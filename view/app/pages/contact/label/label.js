



import React, { Component } from 'react'

import './label.css'



class Label extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { flash: 'void', last: 0 }
	}
	
	
	componentDidUpdate( ) {
		if ( this.props.error && this.props.sent ) {
			const tempo = this.launchPhase.bind( this )
			const factor = this.props.diff.max - this.props.diff.hide
			// Expose and eventually fade out all errors shown
			this.setState( { flash: 'flash', last: new Date( ).getTime( ) } )
			this.alert = this.launchPhase( factor, factor, tempo )
		}
	}
	
	componentWillUnmount( ) {
		clearTimeout( this.alert )
		clearTimeout( this.hide )
	}
	
	generateProps( props ) {
		// Ignore non-component and preassigned field props
		const ignore = [ 'html', 'sent', 'diff', 'value', 'error', 'min' ]
		const query = attr => ignore.every( key => attr[ 0 ] !== key )
		// Fuse together the new props with the screened set
		const join = ( body, attr ) => ( { ...body, [ attr[ 0 ] ]: attr[ 1 ] } )
		return props.filter( query ).reduce( join, {  } )
	}
	
	calculateField( attrs ) {
		const field = this.generateProps( Object.entries( attrs ) )
		const props = { className: attrs.class, ...field, value: attrs.value || '' }
		return React.createElement( this.props.html, props )
	}
	
	launchPhase( factor, time, next ) {
		return setTimeout( ( ) => {
			// Sift through each phase of every validation error
			const delta = new Date( ).getTime( ) - this.state.last
			const action = this.state.flash === 'flash' ? 'hide' : 'void'
			this.setState( delta < factor ? { flash: 'flash' } : { flash: action, last: 0 } )
			next ? this.hide = next( this.props.diff.max, this.props.diff.hide ) : null
		}, time )
	}
	
	throwError( error ) {
		const shroud = this.state.flash === 'void'
		const chrono = new Date( ).getTime( ) - this.state.last
		const view = chrono < this.props.diff.max ? 'label-flash' : 'label-dissolve'
		return shroud ? null : <p className={ view }> { error } </p>
	}
	
	render( ) {
		return (
			<label>
				{ this.calculateField( this.props ) }
				{ this.throwError( this.props.error ) }
			</label>
		)
	}
	
}


export default Label



