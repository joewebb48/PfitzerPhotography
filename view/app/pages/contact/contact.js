



import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Label from './label/label'
import Email from '../../models/email'
import { getBiography } from '../../actions/biography'
import { mapBiography } from '../../helpers/stateprops'
import './contact.css'



class Contact extends Component {
	
	static key = { api: [ getBiography ], params: { path: '/contact' } }
	
	
	constructor( props ) {
		super( props )
		const chrono = { max: 12000, hide: 2000 }
		const status = { sent: false, valid: false, diff: chrono }
		this.state = { status, email: new Email( ) }
		this.updateForm = this.updateForm.bind( this )
	}
	
	
	componentDidMount( ) {
		this.props.getBiography( )
	}
	
	componentDidUpdate( ) {
		// Reset the form's sent status after form submission
		if ( this.state.status.sent ) {
			const meta = { ...this.state.status, sent: false }
			this.setState( { status: meta } )
		}
	}
	
	updateForm( event ) {
		// Update contact form with new form field input data
		const form = this.state.email.fuseForm( event.target )
		this.setState( { email: form } )
	}
	
	onSend( event ) {
		event.preventDefault( )
		const report = { ...this.state.status, sent: true }
		// Validate form field data and set errors when invalid
		const letter = this.state.email.validateFields( )
		this.setState( { status: report, email: letter } )
	}
	
	render( ) {
		const admin = this.props.biography.fields
		const name = admin.name ? admin.name : ''
		const block = !this.state.email.isPopulated( )
		// Set controlled component architecture in form fields
		const props = this.state.email.setProps( this.state.status )
		props.subject.placeholder = 'Enter your message subject.'
		props.address.placeholder = 'Provide your email address.'
		return (
			<form onSubmit={ event => this.onSend( event ) }>
				<h3 className="contact-form"> Contact { name.split( ' ' )[ 0 ] } </h3>
				<Label html="input" onChange={ this.updateForm } { ...props.subject }/>
				<Label html="input" onChange={ this.updateForm } { ...props.address }/>
				<Label html="textarea" onChange={ this.updateForm } { ...props.message }/>
				<button className="contact-submit" disabled={ block }> Send </button>
			</form>
		)
	}
	
}


export default connect( mapBiography, { getBiography } )( Contact )


