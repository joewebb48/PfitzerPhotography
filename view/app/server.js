



import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './app'



class Server extends Component {
	
	render( ) {
		const context = this.props.data ? this.props.data : {  }
		return (
			<Provider store={ this.props.store }>
				<StaticRouter location={ this.props.url } context={ context }>
					<App/>
				</StaticRouter>
			</Provider>
		)
	}
	
}


export default Server


