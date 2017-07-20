import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {signoutUser} from '../../actions/auth_actions';
import {fetchUserInfo,fetchOtherUserInfo,checkFollowing,changeFollowing} from '../../actions/user_actions';

import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


const styles = {
  raisedButton:{
    margin:12
  },
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class HomePageHeader extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.renderFollowButtion = this.renderFollowButtion.bind(this);
  }

  componentWillMount() {
    this.props.fetchOtherUserInfo(this.props.username);
    this.props.fetchUserInfo();
    this.props.checkFollowing(this.props.username);
  }

  renderFollowButtion() {
    this.props.changeFollowing(this.props.otherUser._id, () => {
      this.props.fetchOtherUserInfo(this.props.username);
    })
  }

  renderButton() {
    const {selfUser} =this.props;
    const {otherUser} = this.props;
    const {following} = this.props;
    if(selfUser && otherUser && otherUser.username === selfUser.username){
      return (
        <div className="items_container">
          <div>
            <RaisedButton
              label="Edit Profiles"
              style={styles.raisedButton}
              href="/editfile"
            />
          </div>
          <div>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem
                primaryText="Sign out"
                onClick={this.handleSignOut.bind(this)}
              />
            </IconMenu>
          </div>
        </div>
      );
    } else if (selfUser && otherUser && otherUser.username !== selfUser.username){
      return (
        <div className="items_container">
          <div>
            <RaisedButton
              label={following ? "Unfollow" : "Follow"}
              style={styles.raisedButton}
              onClick={this.renderFollowButtion}
            />
          </div>
        </div>
      );
    } else{
      return (
        <div>
          Loading...
        </div>
      );
    }

  }


  handleSignOut(){
    this.props.signoutUser();
  }

  render() {
    console.log(this.props.isFollowed);
    const {otherUser} = this.props;
    let username,posts, following,followers, avatar;
    if(otherUser) {
      username = otherUser.username;
      posts = otherUser.posts.length;
      following = otherUser.following.length;
      followers = otherUser.followers.length;
      avatar = otherUser.avatar.substring(9);
    }else{
      username = 'loading';
      posts = 'loading';
      following = 'loading';
      followers = 'loading';
    }

    return(
      <div className="head_container">

        <div className="avatar">
          <Avatar src={avatar} size={125} />
        </div>
        <div className="details">
          <div className= "username">{username}</div>
          {this.renderButton()}
          <div className="tag_container">
            <div className="posts">{posts} posts</div>
            <div className="following">{following} following</div>
            <div className="followers">{followers} followers</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selfUser: state.user.userInfo,
    otherUser: state.user.otherUserInfo,
    following:state.user.following
  };
}

export default connect(mapStateToProps, {signoutUser,fetchUserInfo,fetchOtherUserInfo,checkFollowing,changeFollowing})(HomePageHeader);
