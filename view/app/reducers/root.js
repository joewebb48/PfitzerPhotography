



import { combineReducers } from 'redux'
import tagsReducer from './tags'



export default combineReducers( {
	tags: tagsReducer
} )



