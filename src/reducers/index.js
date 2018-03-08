import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import parentsReducer from './parents';
import authReducer from './auth';
import viewReducer from './views';
import sittersReducer from './sitters';
import messagesReducer from './messages';

const rootReducer = combineReducers({
	parents: parentsReducer,
	auth: authReducer,
	view: viewReducer,
	form: formReducer,
	sitters: sittersReducer,
	messages: messagesReducer,
});

export default rootReducer;
