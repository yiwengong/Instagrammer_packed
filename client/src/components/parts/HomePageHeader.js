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



const style = {
  margin: 12,
};

class HomePageHeader extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchUserInfo();
  }

  handleSignOut(){
    console.log(this.props);
    this.props.signoutUser();
  }

  render() {
    const {user} = this.props;
    console.log(user);
    let username,posts, following,followers;
    if(user) {
      username = user.username;
      // posts = user.posts.length;
      following = user.following.length;
      followers = user.followers.length;
    }else{
      username = 'loading';
      posts = 'loading';
      following = 'loading';
      followers = 'loading';
    }

    return(
      <div className="head_container">
        <div className="avatar">
          <Avatar src="/avatar/image1.jpg" size={125} />
        </div>
        <div className="details">
          <div className= "username">{username}</div>
          <div className="items_container">
            <div>
              <RaisedButton
                label="Edit Profiles"
                style={style}
                containerElement={<Link to="/editfile" />}
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
