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

// async actions
