import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/user_actions';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

const styles = {
  avatar : {
    marginTop:30,
    marginBottom:20,
  },
  input: {
    margin:25,
  }
};


class ChangeAvatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl:''
    };
  }

  componentWillMount() {
    this.props.fetchUserInfo();
  }

  handleAvatarSubmit() {
    const data = new FormData();
    data.append('avatar', this.state.file);
    this.props.changeUserAvatar(data);
  }

  handleChangeAvatar(e){
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = ()=>{
      this.setState({
        file:file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  renderAvatar() {
    let {imagePreviewUrl} = this.state;
    const {user} = this.props;
    if(imagePreviewUrl) {
      return(
        <Avatar
         src={imagePreviewUrl}
         size={150}
         style={styles.avatar}
         />
      );
    }else if(user){
      return(
        <Avatar
         src={user.avatar.substring(9)}
         size={150}
         style={styles.avatar}
         />
      );
    }else{
      return(
        <div>loading...</div>
      );

    }
  }

  render() {

    return (
      <div className="avatar_container">
        {this.renderAvatar()}
        <input type="file" id="avatarInput" style={styles.input} onChange={this.handleChangeAvatar.bind(this)}/>
        <div className="message">{this.props.message}</div>
        <RaisedButton onClick={this.handleAvatarSubmit.bind(this)} label="Change Avatar" style={styles.button_style} />
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.user.userInfo,
    message:state.user.message
  };
}

export default connect(mapStateToProps, actions)(ChangeAvatar)
