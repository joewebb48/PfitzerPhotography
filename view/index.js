



import React from 'react'
import ReactDOM from 'react-dom'

import Browser from './app/browser'
import '../root/styles.css'



// Hydrate is used instead of render for isomorphic rendering
ReactDOM.hydrate( <Browser/>, document.getElementById( 'root' ) )



