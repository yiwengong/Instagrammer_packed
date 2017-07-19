import axios from 'axios';
import {
  FETCH_USERINFO,
  FETCH_USERS,
  CHANGE_PASSWORD,
  CHANGE_AVATAR,
  CHANGE_FOLLOWING,
  FETCH_OTHERUSERINFO,
  USER_ERROR
} from './types';

//const ROOT_URL = 'http://localhost:3090';
const ROOT_URL = 'http://54.224.87.182:3090';


// User edit password:
export function changeUserPassword({oldPassword,newPassword}) {
  return function(dispatch) {
    //Submit token to the server
    const data = { oldPassword, newPassword };
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };

    axios.put(`${ROOT_URL}/users/password`, data, config)
      .then(response => {
        dispatch({
          type: CHANGE_PASSWORD,
          payload: response.data
        })
      })
      .catch(({response})=>{
        dispatch((userError(response.data.error)));
      });
  }
}

// User edit avatar:
export function changeUserAvatar(data) {
  return function(dispatch) {
    //Submit token to the server
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.put(`${ROOT_URL}/users/avatar`, data, config)
      .then(response => {
        dispatch({
          type: CHANGE_AVATAR,
          payload: response.data
        })
      })
      .catch(()=>{
        dispatch((userError('Please choose a image.')));
      });
  }
}

//User add new Following:
export function changeFollowing(userId, callback) {
  return function(dispatch) {
    const data = {_id:userId}
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.put(`${ROOT_URL}/users/following`, data, config)
      .then((response) => {
        dispatch({
          type: CHANGE_FOLLOWING
        })
        callback();
      })
      .catch(()=>{
        dispatch((userError('Something wrong!')));
      })
  }
}

export function fetchUserInfo() {
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/user`, config)
      .then(response => {
        dispatch({
          type: FETCH_USERINFO,
          payload: response.data
        });
      });
  }
}

//Fetch most popular user:
export function fetchUsers() {
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/users`, config)
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      });
  }
}

//Fetch other user info:
export function fetchOtherUserInfo(username) {
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/otheruser?username=${username}`, config)
      .then(response => {
        dispatch({
          type: FETCH_OTHERUSERINFO,
          payload: response.data
        });
      });
  }
}

export function userError(error) {
  return{
    type: USER_ERROR,
    payload: error
  };
};
