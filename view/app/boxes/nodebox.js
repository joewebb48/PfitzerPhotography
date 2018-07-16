



import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'



export default ( ) => {
	const box = createStore( reducers, {  }, applyMiddleware( thunk ) )
	return box
}


