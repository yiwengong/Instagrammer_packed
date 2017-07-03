import axios from 'axios';
import {AUTH_USER, AUTH_ERROR,UNAUTH_USER,FETCH_USERINFO,CHANGE_PASSWORD, POST_CREATE,FETCH_POSTINFO, POST_ERROR} from './types';

const ROOT_URL = 'http://localhost:3090';


// User authentication:
export function signupUser({email, username, password}, callback) {
  return function(dispatch) {
    //Submit email/username/password to the server
    axios.post(`${ROOT_URL}/users/signup`, {email, username, password})
      .then(response => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(() => {
        dispatch(authError('Please enter valid information'));
      });
  };
};

export function sigininUser({email, password}, callback) {
  return function(dispatch) {
    //Submit email/password to the server
    axios.post(`${ROOT_URL}/users/signin`, {email, password})
      .then(response =>{
        //If request is good...
        //1.Update state to indicate user is authenticated
        dispatch({type: AUTH_USER});
        //2.Save the JWT token
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(()=> {
        //If request is bad...
        //1.Show an error to the user
        dispatch((authError('Bad Login information')));
      });
  };
};

export function authError(error) {
  return{
    type: AUTH_ERROR,
    payload: error
  };
};

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
};


export function clearError() {
  return {
    type: UNAUTH_USER
  }
};

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

    axios.put(`${ROOT_URL}/users`, data, config)
      .then(response => {
        dispatch({
          type: CHANGE_PASSWORD,
          payload: response.data
        })
      })
      .catch(({response})=>{
        dispatch((authError(response.data.error)));
      });

  }
}

export function fetchUserInfo() {

  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/users`, config)
      .then(response => {
        dispatch({
          type: FETCH_USERINFO,
          payload: response.data
        });
      });
  }
}

//Posts:

export function createNewPost(data, callback) {
  //Submit token and data to the server
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.post(`${ROOT_URL}/posts/new`,data, config)
      .then(response => {
        //If request is good
        dispatch({type: POST_CREATE});
        callback();
      })
      .catch(()=> {
        //If request is bad...
        //1.Show an error to the user
        dispatch((postError('Please choose a image.')));
      });
  }
}

export function fetchPosts() {
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/users/posts`,config)
      .then(response =>{
        dispatch({
          type: FETCH_POSTINFO,
          payload: response.data
        });
      })
      .catch(() =>{
        dispatch((postError('Something wrong!')));
      })
  }
}

export function postError(error) {
  return{
    type: POST_ERROR,
    payload: error
  };
};
