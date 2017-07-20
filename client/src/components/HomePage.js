import React, { Component } from 'react';
import AppTitle from './parts/AppTitle';
import HomePageHeader from './parts/HomePageHeader';
import HomePageBody from './parts/HomePageBody';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppTitle/>
        <HomePageHeader username= {this.props.match.params.username}/>
        <HomePageBody username= {this.props.match.params.username}/>
      </div>
    );
  }
}
