import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  paper:{
    height: 900,
    width: 550,
    margin: 20,
    display: 'inline-block',
  },
  checkbox: {
    marginTop: 20,
    marginLeft:10,
  },
};

class Postdiy extends Component {
  constructor(props) {
      super(props);
      this.changeLikes = this.changeLikes.bind(this);
  }

  componentWillMount() {
    this.props.fetchFollowingPosts();
  }

  changeLikes(postId) {
    this.changeLikes(postId);
  }

  renderCard() {
    const posts = this.props.followingPostsInfo;
    const {postChanged} = this.props
    if(posts) {
      return(
        <div>
          {posts.map((post) =>(
            <div className="post_container" key={post._id}>
              <Paper style={styles.paper} zDepth={1}>
                <Card>
                    <CardHeader
                        title={post.user_id.username}
                        avatar = {post.user_id.avatar.substring(10)}
                    />
                    <CardMedia
                      overlay={<CardTitle title={post.content}/>}
                      >
                        <img src={post.image.substring(10)} alt=""/>
                    </CardMedia>
                </Card>
                <div>
                  <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    style={styles.checkbox}
                    onCheck={()=>{this.changeLikes(post._id)}}
                  />
                  <div className="likes"> {post.likes? post.like:"0"} likes</div>
                </div>
                <div className="comments_container">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div className="add_comment">
                  <TextField hintText="Add a comment..."/><br />
                </div>

              </Paper>
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
    console.log(this.props.followingPostsInfo);
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
