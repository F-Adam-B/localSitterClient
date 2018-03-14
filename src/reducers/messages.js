import * as types from '../actions/actionType';

const initialState = {
	loading: false,
	error: null,
	sentMessages: [],
	receivedMessages: [],
	openContactForm: null,
	recipientEmail: '',
};

const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_MESSAGES_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				error: false,
			});
		case types.FETCH_MESSAGES_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: true,
			});
		case types.STORE_RECIPIENT_EMAIL:
			return Object.assign({}, state, {
				recipientEmail: action.email,
			});
		case types.TOGGLE_CONTACT_FORM:
			return Object.assign({}, state, {
				openContactForm: action.boolean,
			});
		case types.ADD_MESSAGE_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				error: false,
				sentMessages: action.message,
			});
		case types.ADD_MESSAGE_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				error: false,
			});
		case types.ADD_MESSAGE_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});
		case types.ADD_RECEIVED_MESSAGE_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				message: action.message,
			});
		default:
			break;
	}
	return state;
};

export default messagesReducer;
