



import React from 'react'
import ReactDOM from 'react-dom'

import App from './app/app'
import '../root/styles.css'



// Hydrate is used instead of render for isomorphic rendering
ReactDOM.hydrate( <App/>, document.getElementById( 'root' ) )



