import {POST_CREATE,FETCH_POSTINFO, POST_ERROR} from '../actions/types';

export default function(state ={}, action) {
  switch (action.type) {
    case POST_CREATE:
      return {...state, error:''};
    case FETCH_POSTINFO:
      return {...state, error:'', postsInfo: action.payload}
    case POST_ERROR:
      return {...state, error: action.payload};

  }
  return state;
}
