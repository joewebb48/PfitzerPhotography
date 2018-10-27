



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
		const ready = draft.title.value && draft.email.value
		this.setState( { form: draft, send: ready } )
	}
	
	onSend( event ) {
		event.preventDefault( )
		// Verify that form field input data is properly updating
		this.validateInput( this.state.form )
	}
	
	validateInput( form ) {
		const amalgam = {  }
		const floor = { title: 10, email: 100 }
		for ( let field in form ) {
			let type = field === 'title' ? 'subject' : 'message'
			let valid = form[ field ].value.length >= floor[ field ]
			let issue = valid ? '' : 'Your ' + type + ' is too short!'
			amalgam[ field ] = { ...form[ field ], error: issue }
		}
		this.setState( { form: amalgam } )
	}
	
	render( ) {
		const { title, email } = this.state.form
		const lock = { disabled: !this.state.send }
		// Set controlled component architecture in form fields
		const events = { onChange: this.updateForm }
		const subject = { name: 'title', text: 'Subject', ...title }
		const message = { name: 'email', text: 'Message', ...email }
		return (
			<form onSubmit={ event => this.onSend( event ) }>
				<h3 className="contact-form"> Contact { this.state.name } </h3>
				<Label html="input" { ...subject } { ...events }/>
				<Label html="textarea" { ...message } { ...events }/>
				<button className="contact-submit" { ...lock }> Send </button>
			</form>
		)
	}
	
}


export default Contact



