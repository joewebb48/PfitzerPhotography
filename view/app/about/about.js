



import React, { Component } from 'react'

import Navigator from '../navigator/navigator'
import './about.css'



class About extends Component {
	
	render( ) {
		return (
			<section>
				<header>
					<Navigator/>
				</header>
				<div className="about-frame">
					<h1> Ursula Pfitzer </h1>
					<div className="about-image about-portrait"/>
					<div className="about-bio">
						<div className="about-text">
							<p> About Text Here </p>
						</div>
						<div className="about-image about-image-top"/>
						<div className="about-image about-image-bottom"/>
					</div>
				</div>
			</section>
		)
	}
	
}


export default About



