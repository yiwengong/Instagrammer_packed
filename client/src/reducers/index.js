import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import postReducer from './post_reducer';
import commentReducer from './comment_reducer';

const rootReducer = combineReducers({
  form:formReducer,
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  comments:commentReducer
});

export default rootReducer;
