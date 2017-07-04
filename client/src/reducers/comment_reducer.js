import {COMMENT_CREATE,COMMENT_ERROR} from '../actions/types';

export default function(state ={}, action) {
  switch (action.type) {
    case COMMENT_CREATE:
      return {...state, error:'', ownCommentInfo:action.payload};
    case COMMENT_ERROR:
      return {...state, error: action.payload};
  }
  return state;
}
