import React, {Component} from 'react';
// import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {createComment} from '../../../actions/comments_actions';
import TextField from 'material-ui/TextField';

const style ={
  margin:0,
}

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit =this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const data = {
      comment:document.getElementById('commentInput').value,
      post_id: this.props.postid
    }
    document.getElementById('commentInput').value ='';
    this.props.createComment(data,()=>{
      console.log(this.props.comment);
    })
  };

  render() {

    return(
      <form onSubmit={(event)=>this.handleSubmit(event)}>
        <TextField
          id="commentInput"
          style={style}
          hintText="Add comments..."
          fullWidth = {true}
        /><br />
      </form>


    );
  }
}

function mapStateToProps(state) {
  return {
    comment: state.comments.ownCommentInfo
  }
}


export default connect(mapStateToProps,{createComment})(CommentInput);
