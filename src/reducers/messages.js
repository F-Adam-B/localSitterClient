import * as types from '../actions/actionType';

const initialState = {
	loading: false,
	error: null,
	sentMessages: [],
	receivedMessages: [],
};

const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_MESSAGE_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				error: false,
				sentMessages: action.message,
			});
		default:
			break;
	}
	return state;
};

export default messagesReducer;
