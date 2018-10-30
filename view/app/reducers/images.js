



import { image } from '../actions/images'



export default function( state = [ ], action ) {
	switch ( action.type ) {
		case image:
			return action.feedback.data
		default:
			return state
	}
}



