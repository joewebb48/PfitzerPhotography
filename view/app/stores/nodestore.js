



import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/root'



export default function( ) {
	const box = createStore( rootReducer, {  }, applyMiddleware( thunk ) )
	return box
}


