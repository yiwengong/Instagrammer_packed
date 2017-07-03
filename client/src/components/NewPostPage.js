import React, { Component } from 'react';
import AppTitle from './parts/AppTitle';
import PostNew from './parts/PostNew';

export default class NewPostPage extends Component {
  render() {
    return (
      <div>
        <AppTitle />
        <PostNew history={this.props.history}/>
      </div>
    );
  }
}
