import * as types from '../actions/actionType';

const initialState = {
	loading: false,
	error: null,
	sentMessages: [],
	receivedMessages: [],
	openContactForm: false,
	recipientEmail: '',
};

const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.STORE_RECIPIENT_EMAIL:
			return Object.assign({}, state, {
				recipientEmail: action.email,
			});
		case types.TOGGLE_CONTACT_FORM:
			return Object.assign({}, state, {
				openContactForm: true,
			});
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
