import {FETCH_USERINFO,CHANGE_PASSWORD} from '../actions/types';

export default function(state ={}, action) {
  switch (action.type) {
    case FETCH_USERINFO:
      return {...state, message: '',userInfo: action.payload}
    case CHANGE_PASSWORD:
      return {...state, message:action.payload}
  }
  return state;
}
