



import { combineReducers } from 'redux'

import biographyReducer from './biography'
import imagesReducer from './images'



export default combineReducers( {
	biography: biographyReducer,
	images: imagesReducer
} )


