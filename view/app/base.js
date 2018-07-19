



import React, { Component } from 'react'
import ReactDOM from 'react-dom'



class Base extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { tags: [ ] }
	}
	
	
	componentDidUpdate( ) {
		// Placeholder update management for testing tag updates
		if ( this.state.tags.length === 0 ) {
			const oldTags = Array.from( document.head.children )
			// Undo the native DOM head tags and create them as jsx 
			const newTags = oldTags.map( tag => {
				let label = tag.tagName.toLowerCase( )
				let keys = Object.keys( tag.attributes )
				let attrs = keys.length > 0 ? [ ] : null
				// Aggregate necessary tag attributes for props usage
				if ( keys.length > 0 ) {
					keys.forEach( key => {
						let name = tag.attributes[ key ][ 'name' ]
						let value = tag.attributes[ key ][ 'value' ]
						// React is really picky about props nomenclature
						name = name === 'charset' ? 'charSet' : name
						attrs.push( Object.defineProperty( {  }, name, { value: value } ) )
					} )
				}
				let inner = tag.textContent
				inner = inner.length > 0 ? inner : null
				// Title tag changes set up for tag update development
				label === 'title' ? inner = 'Test Title' : null
				let props = {  }
				// Generated props attributes need much more refining
				for ( let idx = 0; idx < keys.length; idx++ ) {
					let attr = attrs ? Object.keys( attrs )[ idx ] : null
					let field = attrs ? attrs[ attr ] : null
					let ref = attrs ? Object.getOwnPropertyNames( field )[ 0 ] : null
					props[ ref ] = attrs ? field : null
					// Finally create a properly configured props attribute
					Object.defineProperty( props, ref, { value: field[ ref ] } )
				}
				console.log( props )
				// Instantiate the jsx tag element via the extracted data
				return React.createElement( label, props, inner )
			} )
			console.log( oldTags )
			console.log( newTags )
			this.setState( { tags: newTags } )
		}
	}
	
	setTags( ) {
		let enumerator = 0
		return this.state.tags.map( tag => {
			// Mirror jsx element creation required for key assignment
			enumerator++
			const Tag = tag.type
			// Will need to be changed to keep DOM access abstracted
			document.head.children.item( 0 ).remove( )
			return <Tag key={ enumerator } { ...tag.props }/>
		} )
	}
	
	render( ) {
		// Everything in this component will be inside of the head tag
		return ReactDOM.createPortal( this.setTags( ), document.head )
	}
	
}


export default Base


