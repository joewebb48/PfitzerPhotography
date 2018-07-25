



import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'



class Base extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { tags: [ ], injected: false }
	}
	
	
	componentDidMount( ) {
		this.generateTags( )
	}
	
	async componentDidUpdate( props ) {
		this.state.injected ? null : this.setState( { injected: true } )
		// Only execute page data changes when the url changes
		if ( this.props.location !== props.location ) {
			let url = { params: { url: this.props.location } }
			let data = props.location ? await axios.get( '/data', url ) : false
			this.generateTags( data )
		}
	}
	
	generateTags( info ) {
		// Set up a proxy to the DOM's head tag to safely access it
		const proxy = ReactDOM.createPortal( <></>, document.head )
		const raws = Array.from( proxy.containerInfo.children )
		// Undo the native DOM head tags and create them as jsx
		const tags = raws.map( tag => {
			let label = tag.tagName.toLowerCase( )
			let keys = Object.keys( tag.attributes )
			let attrs = {  }
			// Aggregate necessary tag attributes for props usage
			if ( keys.length > 0 ) {
				keys.forEach( key => {
					let name = tag.attributes[ key ][ 'name' ]
					let value = tag.attributes[ key ][ 'value' ]
					// React is really picky about props nomenclature
					name = name === 'charset' ? 'charSet' : name
					attrs[ name ] = value
				} )
			}
			let inner = tag.textContent.length > 0 ? tag.textContent : null
			inner = label === 'title' && info ? info.data.fields.title : inner
			// Instantiate the jsx tag element via the extracted data
			return React.createElement( label, attrs, inner )
		} )
		this.setState( { tags: tags } )
	}
	
	setTags( ) {
		let enumerator = 0
		return this.state.tags.map( tag => {
			// Mirror jsx list element generation for key assignment
			enumerator++
			const Tag = tag.type
			if ( !this.state.injected ) {
				// Keep DOM access abstracted for safe node removal
				let node = ReactDOM.createPortal( <></>, document.head.firstElementChild )
				node.containerInfo.remove( )
			}
			return <Tag key={ enumerator } { ...tag.props }/>
		} )
	}
	
	render( ) {
		// No server-rendering since this component uses the DOM
		if ( !this.props.location ) {
			return null
		}
		// Everything in this component will be inside the head tag
		return ReactDOM.createPortal( this.setTags( ), document.head )
	}
	
}


export default Base


