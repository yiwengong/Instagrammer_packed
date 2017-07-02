import {POST_CREATE,POST_ERROR} from '../actions/types';

export default function(state ={}, action) {
  switch (action.type) {
    case POST_CREATE:
      return {...state, error:''};
    case POST_ERROR:
      return {...state, error: action.payload};

  }
  return state;
}
