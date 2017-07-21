import {POST_CREATE,FETCH_USERPOSTINFO, FETCH_FOLLOWINGPOSTINFO,CHANGE_LIKES, POST_ERROR} from '../actions/types';

export default function(state ={}, action) {
  switch (action.type) {
    case POST_CREATE:
      return {...state, error:''};
    case FETCH_USERPOSTINFO:
      return {...state, error:'', userPostsInfo: action.payload};
    case FETCH_FOLLOWINGPOSTINFO:
      return {...state, error:'', followingPostsInfo: action.payload};
    case CHANGE_LIKES:
      return {...state, error:'',ChangedPost: action.payload};
    case POST_ERROR:
      return {...state, error: action.payload};

  }
  return state;
}
