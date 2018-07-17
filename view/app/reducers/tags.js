



import { metadata } from '../actions/metadata'



export default function( state = {  }, action ) {
	switch ( action.type ) {
		case metadata:
			return action.feedback.data
		default:
			return state
	}
}



