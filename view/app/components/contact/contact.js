



import React, { Component } from 'react'
import axios from 'axios'

import './contact.css'



class Contact extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { email: '' }
	}
	
	
	componentDidMount( ) {
		axios.get( '/email' ).then( email => {
			console.log( email )
			this.setState( { email: email.data.fields.email } )
		} )
	}
	
	onSend( event ) {
		event.preventDefault( )
		console.log( 'Nothing submitted!' )
	}
	
	render( ) {
		return (
			<section>
				<form onSubmit={ event => this.onSend( event ) }>
					<h3 className="contact-email"> { this.state.email } </h3>
					<label>
						Subject
						<input className="contact-field" name="title"/>
					</label>
					<label>
						Message
						<textarea className="contact-field" name="message"/>
					</label>
					<button className="contact-submit"> Send </button>
				</form>
			</section>
		)
	}
	
}


export default Contact



