import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
} from './types';

const ROOT_URL = 'http://localhost:3090';
// const ROOT_URL = 'http://54.224.87.182:3090';


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
