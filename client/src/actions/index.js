import axios from 'axios';
import {AUTH_USER, AUTH_ERROR,UNAUTH_USER,FETCH_USERINFO,CHANGE_PASSWORD} from './types';

const ROOT_URL = 'http://localhost:3090';


// User authentication:
export function signupUser({email, username, password}, callback) {
  return function(dispatch) {
    //Submit email/username/password to the server
    axios.post(`${ROOT_URL}/users/signup`, {email, username, password})
      .then(response => {
        console.log(response);
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
        //If request is good
        console.log(response);
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
    axios.get(`${ROOT_URL}/users`, {
      headers: {authorization: localStorage.getItem('token')},
    })
      .then(response => {
        dispatch({
          type: FETCH_USERINFO,
          payload: response.data
        });
      });
  }
}
