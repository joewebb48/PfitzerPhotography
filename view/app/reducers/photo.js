



import { photo } from '../actions/photos'



export default function( state = [ ], action ) {
	switch ( action.type ) {
		case photo:
			return action.feedback.data
		default:
			return state
	}
}



