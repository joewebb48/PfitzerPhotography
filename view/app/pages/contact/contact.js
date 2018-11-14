



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
		const diff = { max: 12000, hide: 2000 }
		this.state = { diff, sent: false, email: new Email( ) }
		this.updateForm = this.updateForm.bind( this )
	}
	
	
	componentDidMount( ) {
		const identity = Object.keys( this.props.biography )
		// Collect missing data if any that hasn't yet loaded up
		identity.length ? null : this.props.getBiography( )
	}
	
	componentDidUpdate( ) {
		// Reset the form's sent status after form submission
		if ( this.state.sent ) {
			this.setState( { sent: false } )
		}
	}
	
	updateForm( event ) {
		// Update contact form with new form field input data
		const form = this.state.email.fuseForm( event.target )
		this.setState( { email: form } )
	}
	
	onTransfer( event ) {
		event.preventDefault( )
		// Validate form field data and set errors when invalid
		const email = this.state.email.validateFields( )
		this.setState( { sent: true, email: email } )
		// Identify whether or not form field data is valid input
		if ( email.invalidated === 0 ) {
			// Wrap data in a query string for any post protocol
			const wrap = email.harvestQuery( this.props.biography )
			const head = 'application/x-www-form-urlencoded'
			// Xsrf token is used to send post data to the server
			const xsrf = { xsrfCookieName: 'xsrf', xsrfHeaderName: 'xsrf' }
			const config = { ...xsrf, headers: { 'Content-Type': head } }
			// Post the email data to the backend for processing
			axios.post( '/email', wrap, config ).then( echo => {
				console.log( 'Email:', echo.data )
			} )
		}
	}
	
	render( ) {
		const artist = this.props.biography.fields
		const block = !this.state.email.isPopulated( )
		const name = artist && artist.name ? artist.name : ''
		// Set controlled component architecture in form fields
		const props = this.state.email.setProps( this.state )
		props.subject.placeholder = 'Enter your message subject.'
		props.address.placeholder = 'Provide your email address.'
		return (
			<form onSubmit={ event => this.onTransfer( event ) }>
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


