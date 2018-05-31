



import React, { Component } from 'react'

import logo from '../../../root/img/logo.svg'
import './title.css'



class Title extends Component {
	
	render( ) {
		return (
			<header className="title-header">
				<img src={ logo } className="title-logo" alt="logo"/>
				<h1 className="title-text"> Pfitzer Photography </h1>
			</header>
		)
	}
	
}


export default Title



