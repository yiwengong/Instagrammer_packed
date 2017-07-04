import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

//import components
import AppTitle from './parts/AppTitle';
import Cards from './parts/IndexPageContents/Postdiy';
import SugguestedFollower from './parts/IndexPageContents/SugguestedFollowers';
import Intro from './parts/IndexPageContents/Intro';

class IndexPage extends Component {

  componentWillMount() {
    this.props.fetchUserInfo();
  }

  renderComponent() {
    const {user} = this.props;
    if(user){
      if(user.following.length === 0) {
        return(
          <div>
            <Intro />
            <SugguestedFollower />
          </div>
        );
      }else {
        return(
          <Cards />
        );
      }
    }else{
      return(
        <div>Loading...</div>
      );
    }

  }

  render() {
    return (
      <div>
        <AppTitle />
        {this.renderComponent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user.userInfo};
}

export default connect(mapStateToProps, actions)(IndexPage);
