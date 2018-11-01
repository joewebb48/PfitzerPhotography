



import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/root'



export default function( state ) {
	const box = createStore( rootReducer, state, applyMiddleware( thunk ) )
	return box
}


