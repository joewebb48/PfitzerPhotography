



import React, { Component } from 'react'

import Navigator from '../navigator/navigator'
import './contact.css'



class Contact extends Component {
	
	onSend( event ) {
		event.preventDefault( )
		console.log( 'Nothing submitted!' )
	}
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
				<form onSubmit={ event => this.onSend( event ) }>
					<h3 className="contact-email"> email@website.com </h3>
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



