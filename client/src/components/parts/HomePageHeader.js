import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';

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
  }

  componentWillMount() {
    this.props.fetchUserInfo();
  }

  handleSignOut(){
    this.props.signoutUser();
  }

  handleUploadAvatar(){
    const file = document.getElementById("avatarFile").files[0];
    console.log(file);
    // this.props.changeAvatar();
  }

  render() {
    const {user} = this.props;
    let username,posts, following,followers, avatar;
    if(user) {
      username = user.username;
      posts = user.posts.length;
      following = user.following.length;
      followers = user.followers.length;
      avatar = user.avatar.substring(9);
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
  return {user: state.user.userInfo};
}

export default connect(mapStateToProps, actions)(HomePageHeader);
