



import React, { Component } from 'react'

import './contact.css'



class Contact extends Component {
	
	static key = { api: '/email', params: { path: '/contact' } }
	
	
	constructor( props ) {
		super( props )
		this.state = { email: '', title: '', message: '' }
		this.updateForm = this.updateForm.bind( this )
	}
	
	
	componentDidMount( ) {
		const { api } = this.constructor.key
		this.constructor.key.load( api ).then( email => {
			console.log( email )
			this.setState( { email: email.data.fields.email } )
		} )
	}
	
	updateForm( event ) {
		const field = event.target.name
		const value = event.target.value
		this.setState( { [ field ]: value } )
	}
	
	onSend( event ) {
		event.preventDefault( )
		// Verify that form field input data is properly updating
		const ready = this.state.title && this.state.message
		const inform = form => console.log( '\n', form, '\n\n' )
		inform( !ready ? 'Incomplete form!' : this.state )
	}
	
	render( ) {
		// Set controlled component architecture in form fields
		const events = { onChange: this.updateForm }
		const subject = { name: 'title', value: this.state.title }
		const message = { name: 'message', value: this.state.message }
		return (
			<form onSubmit={ event => this.onSend( event ) }>
				<h3 className="contact-email"> { this.state.email } </h3>
				<label>
					Subject
					<input className="contact-field" { ...subject } { ...events }/>
				</label>
				<label>
					Message
					<textarea className="contact-field" { ...message } { ...events }/>
				</label>
				<button className="contact-submit"> Send </button>
			</form>
		)
	}
	
}


export default Contact


