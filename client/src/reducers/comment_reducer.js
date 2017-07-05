import {COMMENT_CREATE,FETCH_COMMENTS, COMMENT_ERROR} from '../actions/types';

export default function(state ={}, action) {
  switch (action.type) {
    case COMMENT_CREATE:
      return {...state, error:'', ownCommentInfo:action.payload};
    case FETCH_COMMENTS:
      return {...state, error:'', postComments:action.payload};
    case COMMENT_ERROR:
      return {...state, error: action.payload};
  }
  return state;
}
