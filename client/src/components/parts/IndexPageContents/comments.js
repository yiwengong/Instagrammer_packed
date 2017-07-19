import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/comments_actions';

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


import CommentInput from './commentInput';
import CommentList from './commentList';

const styles = {
  card: {
    margin: 0,
  },
  checkbox: {
    marginTop: 0,
    marginLeft:10,
  },
  cardtext: {
    marginTop:0,
    paddingTop:0,
  }
};


class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      allComment: []
    };
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({expanded: true});
    this.props.fetchPostComments(this.props.postid, (comments) => {
      this.setState({ allComment: this.renderComments(comments) });
    });
  };

  renderComments(comments) {
    // const {comments} = this.props;
    if(comments) {
      return (
        <div>
          <ul>
            {comments.map((comment) =>(
              <li key = {comment._id}>
                <span>{comment.user_id.username}</span>: {comment.comment}
              </li>
            ))}
          </ul>
        </div>
      );
    }else{
      return (
        <div>Loading...</div>
      );
    }
  }

  render() {
    // console.log(this.props.comments)
    return (
    <div >
      <Paper>
        <Card style = {styles.card} expanded={this.state.expanded}>
          <div className="">
            <FlatButton label="load more comments"
              onClick={this.handleExpand}
            />
          </div>
          <CardText style= {styles.cardtext} expandable={true}>
            {this.state.allComment}
          </CardText>
          <CardText>
            <CommentInput postid={this.props.postid}/>
          </CardText>
        </Card>
      </Paper>

    </div>
    );
  }
}

function mapStateToProps(state){
  return {
    comments: state.comments.postComments
  }
}

export default connect(mapStateToProps, actions)(Comments);
