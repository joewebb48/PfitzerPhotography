



import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import './styles.css'



// Hydrate is used instead of render for isomorphic rendering
ReactDOM.hydrate( <App/>, document.getElementById( 'root' ) )



