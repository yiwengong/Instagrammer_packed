import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';

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

  handleAvatarSubmit(e) {

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
    if(imagePreviewUrl) {
      return(
        <Avatar
         src={imagePreviewUrl}
         size={150}
         style={styles.avatar}
         />
      );
    }else{
      return(
        <Avatar
         src="/avatar/image1.jpg"
         size={150}
         style={styles.avatar}
         />
      );
    }
  }

  render() {

    return (
      <div className="avatar_container">
        {this.renderAvatar()}
        <input type="file" id="avatarInput" style={styles.input} onChange={this.handleChangeAvatar.bind(this)}/>
        <RaisedButton onSubmit={this.handleAvatarSubmit.bind(this)} label="Change Avatar" style={styles.button_style} />
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, actions)(ChangeAvatar)