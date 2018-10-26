



import React, { Component } from 'react'

import Label from './label/label'
import './contact.css'



class Contact extends Component {
	
	static key = { api: '/email', params: { path: '/contact' } }
	
	
	constructor( props ) {
		super( props )
		const field = { value: '', error: '' }
		const preset = { title: field, email: field }
		this.state = { name: '', send: false, form: preset }
		this.updateForm = this.updateForm.bind( this )
	}
	
	
	componentDidMount( ) {
		const { api } = this.constructor.key
		this.constructor.key.load( api ).then( email => {
			console.log( email )
			this.setState( { name: email.data.fields.name } )
		} )
	}
	
	updateForm( event ) {
		const { name, value } = event.target
		// Merge the new field input values into copies of state
		const info = { ...this.state.form[ name ], value }
		const draft = { ...this.state.form, [ name ]: info }
		// Update contact form with new form field input data
		this.setState( { form: draft } )
	}
	
	onSend( event, form ) {
		event.preventDefault( )
		// Verify that form field input data is properly updating
		const criteria = form.title.value && form.email.value
		const ready = form => console.log( '\n', form, '\n\n' )
		ready( !criteria ? 'Incomplete form!' : this.state )
	}
	
	render( ) {
		const { title, email } = this.state.form
		// Set controlled component architecture in form fields
		const events = { onChange: this.updateForm }
		const subject = { name: 'title', text: 'Subject', value: title.value }
		const message = { name: 'email', text: 'Message', value: email.value }
		return (
			<form onSubmit={ event => this.onSend( event, this.state.form ) }>
				<h3 className="contact-form"> Contact { this.state.name } </h3>
				<Label html="input" { ...subject } { ...events }/>
				<Label html="textarea" { ...message } { ...events }/>
				<button className="contact-submit"> Send </button>
			</form>
		)
	}
	
}


export default Contact



