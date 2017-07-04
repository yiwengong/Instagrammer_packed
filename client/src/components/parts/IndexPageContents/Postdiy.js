import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import Comments from './comments';

const styles = {
   card: {
    width: 550,
    margin: 20,
  },
  checkbox: {
    marginTop: 20,
    marginLeft:10,
  },
};

class Postdiy extends Component {
  constructor(props) {
      super(props);
      this.handleLikes = this.handleLikes.bind(this);
  }

  componentWillMount() {
    this.props.fetchFollowingPosts();
  }

  handleLikes(event, isInputChecked, postId) {
    console.log(event)
    console.log(isInputChecked)
    this.props.changeLikes(postId,isInputChecked,()=>{
      this.props.fetchFollowingPosts();
    });
  }

  renderCard() {
    const posts = this.props.followingPostsInfo;
    const {postChanged} = this.props
    if(posts) {
      return(
        <div>
          {posts.map((post) =>(
            <div className="post_container" key={post._id}>
                <Card style={styles.card}>
                    <CardHeader
                        title={post.user_id.username}
                        avatar = {post.user_id.avatar.substring(10)}
                    />
                    <CardMedia
                      overlay={<CardTitle title={post.content}/>}
                      >
                        <img src={post.image.substring(10)} alt=""/>
                    </CardMedia>
                    <Checkbox
                      checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}
                      style={styles.checkbox}

                      onCheck = {(event,isInputChecked) => {this.handleLikes(event,isInputChecked,post._id)}}
                    />
                    <div className="likes"> {post.likes} likes</div>
                    <div>
                      <Comments postid={post._id}/>
                    </div>
                </Card>

            </div>


          ))}
        </div>
      );
    }else{
      return(
        <div>Loading...</div>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderCard()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    followingPostsInfo: state.posts.followingPostsInfo,
    postChanged: state.posts.postChanged
  };
}

export default connect(mapStateToProps, actions)(Postdiy);
