import axios from 'axios';
import {
  COMMENT_CREATE,
  FETCH_COMMENTS,
  COMMENT_ERROR
}
  from './types';

const ROOT_URL = 'http://localhost:3090';

//Comments:

//Create a comment:
export function createComment(data, callback) {
  //Submit token and data to the server
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.post(`${ROOT_URL}/comments/new`,data, config)
      .then(response => {
        //If request is good
        dispatch({
          type: COMMENT_CREATE,
          payload:response.data
        });
        callback();
      })
      .catch(()=> {
        //If request is bad...
        //1.Show an error to the user
        dispatch((commentsError('Something wrong')));
      });
  };
};

export function fetchPostComments(postId) {
  return function(dispatch) {
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(`${ROOT_URL}/comments?id=${postId}`, config)
      .then(response =>{
        dispatch({
          type: FETCH_COMMENTS,
          payload:response.data.comments
        });
      })
      .catch(() =>{
        dispatch((commentError('Something wrong!')));
      });
    };
}

export function commentError(error) {
  return{
    type: COMMENT_ERROR,
    payload: error
  };
};
