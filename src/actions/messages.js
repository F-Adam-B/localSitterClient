import * as types from './actionType';

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

export const toggleContactForm = () => ({
	type: types.TOGGLE_CONTACT_FORM,
});

export const storeRecipientEmail = email => ({
	type: types.STORE_RECIPIENT_EMAIL,
	email,
});

// async actions
