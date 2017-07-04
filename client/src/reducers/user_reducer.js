import {FETCH_USERINFO,FETCH_USERS,CHANGE_PASSWORD,CHANGE_AVATAR,CHANGE_FOLLOWING} from '../actions/types';

export default function(state ={following: false}, action) {
  switch (action.type) {
    case FETCH_USERINFO:
      return {...state, message: '',userInfo: action.payload}
    case CHANGE_PASSWORD:
      return {...state, message:action.payload}
    case CHANGE_AVATAR:
      return {...state, message:action.payload}
    case FETCH_USERS:
      return {...state, message:'', users: action.payload}
    case CHANGE_FOLLOWING:
      return {...state, message: '',following: !state.following}
  }
  return state;
}
