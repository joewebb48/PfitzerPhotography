



import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Label from './label/label'
import { getBiography } from '../../actions/biography'
import { mapBiography } from '../../helpers/stateprops'
import './contact.css'



class Contact extends Component {
	
	static key = { api: [ getBiography ], params: { path: '/contact' } }
	
	
	constructor( props ) {
		super( props )
		const field = { value: '', error: '' }
		const chrono = { max: 12000, hide: 2000 }
		const status = { sent: false, diff: chrono }
		const preset = { title: field, email: field, content: field }
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
		const key = field => field[ 0 ] === 'status' || field[ 1 ][ 'value' ]
		const unlock = Object.entries( draft ).every( key )
		this.setState( { form: draft, active: unlock } )
	}
	
	onSend( event ) {
		event.preventDefault( )
		// Validate form field data and set errors when invalid
		this.validateInput( this.state.form )
	}
	
	validateInput( form ) {
		const floor = { title: 10, email: 10, content: 100 }
		const subs = { title: 'subject', email: 'email', content: 'message' }
		const amalgam = { status: { ...form.status, sent: true } }
		for ( let field in form ) {
			if ( field !== 'status' ) {
				let valid = form[ field ].value.length >= floor[ field ]
				let warn = valid ? '' : 'Your ' + subs[ field ] + ' is too short!'
				amalgam[ field ] = { ...form[ field ], error: warn }
			}
		}
		this.setState( { form: amalgam } )
	}
	
	render( ) {
		const { title, email, content, status } = this.state.form
		const lock = { disabled: !this.state.active }
		const noun = this.props.biography.fields ? this.props.biography.fields.name : ''
		// Set controlled component architecture in form fields
		const head = { name: 'title', placeholder: 'Your message subject.', ...title, ...status }
		const user = { name: 'email', placeholder: 'Your email address here.', ...email, ...status }
		const body = { name: 'content', placeholder: 'Your message here.', ...content, ...status }
		return (
			<form onSubmit={ event => this.onSend( event ) }>
				<h3 className="contact-form"> Contact { noun.split( ' ' )[ 0 ] } </h3>
				<Label html="input" onChange={ this.updateForm } { ...head }/>
				<Label html="input" onChange={ this.updateForm } { ...user }/>
				<Label html="textarea" onChange={ this.updateForm } { ...body }/>
				<button className="contact-submit" { ...lock }> Send </button>
			</form>
		)
	}
	
}


export default connect( mapBiography, { getBiography } )( Contact )


