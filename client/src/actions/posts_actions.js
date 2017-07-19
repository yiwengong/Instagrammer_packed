import axios from 'axios';
import {
  POST_CREATE,
  FETCH_OWNPOSTINFO,
  FETCH_FOLLOWINGPOSTINFO,
  CHANGE_LIKES,
  POST_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:3090';
// const ROOT_URL = 'http://54.224.87.182:3090';

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


//Fetch own posts:
export function fetchOwnPosts() {
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/users/posts`,config)
      .then(response =>{
        dispatch({
          type: FETCH_OWNPOSTINFO,
          payload: response.data
        });
      })
      .catch(() =>{
        dispatch((postError('Something wrong!')));
      })
  }
}

//Fetch following users' posts:
export function fetchFollowingPosts() {
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/posts/followingposts`,config)
      .then(response =>{
        dispatch({
          type: FETCH_FOLLOWINGPOSTINFO,
          payload: response.data
        });
      })
      .catch(() =>{
        dispatch((postError('Something wrong!')));
      })
  }
}

//Change like state of a post:
export function changeLikes(postId,isInputChecked, callback) {
  return function(dispatch) {
    const data = {
      _id:postId,
      checked: isInputChecked
    }
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.put(`${ROOT_URL}/posts/changeLikes`,data, config)
      .then(response =>{
        dispatch({
          type: CHANGE_LIKES,
          payload:response.data
        });
        callback();
      })
      .catch(() =>{
        dispatch((postError('Something wrong!')));
      });
    };
};


export function postError(error) {
  return{
    type: POST_ERROR,
    payload: error
  };
};
