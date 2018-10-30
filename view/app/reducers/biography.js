



import { biography } from '../actions/biography'



export default function( state = {  }, action ) {
	switch ( action.type ) {
		case biography:
			return action.feedback.data
		default:
			return state
	}
}



