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

// async actions

export const createMessage = data => (dispatch, getState) => {
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
		.then(res => dispatch(addMessageSuccess(res)))
		.catch(err => {
			dispatch(addMessageRequest(err));
		});
};
