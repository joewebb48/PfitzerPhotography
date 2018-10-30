



import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Label from './label/label'
import { getBiography } from '../../actions/biography'
import './contact.css'



class Contact extends Component {
	
	static key = { api: [ getBiography ], params: { path: '/contact' } }
	
	
	constructor( props ) {
		super( props )
		const field = { value: '', error: '' }
		const chrono = { max: 12000, hide: 2000 }
		const preset = { title: field, email: field }
		const status = { sent: false, diff: chrono }
		this.state = { active: false, form: { ...preset, status } }
		this.updateForm = this.updateForm.bind( this )
	}
	
	
	componentDidMount( ) {
		this.props.getBiography( )
	}
	
	componentDidUpdate( ) {
		// Reset the form's sent status after form submission
		if ( this.state.form.status.sent ) {
			const meta = { ...this.state.form.status, sent: false }
			this.setState( { form: { ...this.state.form, status: meta } } )
		}
	}
	
	updateForm( event ) {
		const { name, value } = event.target
		// Merge the new field input values into copies of state
		const info = { ...this.state.form[ name ], value }
		const draft = { ...this.state.form, [ name ]: info }
		// Update contact form with new form field input data
		const ready = draft.title.value && draft.email.value
		this.setState( { form: draft, active: ready } )
	}
	
	onSend( event ) {
		event.preventDefault( )
		// Validate form field data and set errors when invalid
		this.validateInput( this.state.form )
	}
	
	validateInput( form ) {
		const floor = { title: 10, email: 100 }
		const amalgam = { status: { ...form.status, sent: true } }
		for ( let field in form ) {
			if ( field !== 'status' ) {
				let type = field === 'title' ? 'subject' : 'message'
				let valid = form[ field ].value.length >= floor[ field ]
				let warn = valid ? '' : 'Your ' + type + ' is too short!'
				amalgam[ field ] = { ...form[ field ], error: warn }
			}
		}
		this.setState( { form: amalgam } )
	}
	
	render( ) {
		const { title, email, status } = this.state.form
		const lock = { disabled: !this.state.active }
		// Set controlled component architecture in form fields
		const head = { name: 'title', placeholder: 'Your message subject.', ...title, ...status }
		const body = { name: 'email', placeholder: 'Your message here.', ...email, ...status }
		return (
			<form onSubmit={ event => this.onSend( event ) }>
				{/* <h3 className="contact-form"> Contact { this.state.name } </h3> */}
				<Label html="input" onChange={ this.updateForm } { ...head }/>
				<Label html="textarea" onChange={ this.updateForm } { ...body }/>
				<button className="contact-submit" { ...lock }> Send </button>
			</form>
		)
	}
	
}


export default connect( data => ( { biography: data.biography } ), { getBiography } )( Contact )



