import * as types from './actionType';
import { API_BASE_URL } from './../config';
import { normalizeResponseErrors } from './utils';

// sync actions
export const addMessageRequest = () => ({
	type: types.ADD_MESSAGE_REQUEST,
});

export const addMessageError = error => ({
	type: types.ADD_MESSAGE_ERROR,
	error,
});

export const addMessageSuccess = message => ({
	type: types.ADD_MESSAGE_SUCCESS,
	message,
});

export const toggleContactForm = boolean => ({
	type: types.TOGGLE_CONTACT_FORM,
	boolean,
});

export const storeRecipientEmail = email => ({
	type: types.STORE_RECIPIENT_EMAIL,
	email,
});

export const fetchMessagesRequest = () => ({
	type: types.FETCH_MESSAGES_REQUEST,
});

export const fetchMessagesError = error => ({
	type: types.FETCH_MESSAGES_ERROR,
	error,
});

export const fetchMessagesSuccess = messages => ({
	type: types.FETCH_MESSAGES_SUCCESS,
	messages,
});
// async actions

export const createMessage = data => (dispatch, getState) => {
	let userId = { userId: data.userId };
	dispatch(addMessageRequest());
	return fetch(`${API_BASE_URL}/messages/create_message`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(res => dispatch(fetchMessageByUser(userId)))
		.catch(err => {
			dispatch(addMessageError(err));
		});
};

export const fetchMessageByUser = data => (dispatch, getState) => {
	dispatch(fetchMessagesRequest());
	return fetch(`${API_BASE_URL}/messages/${data.userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(res => dispatch(addMessageSuccess(res)))
		.catch(err => {
			dispatch(fetchMessagesError(err));
		});
};
