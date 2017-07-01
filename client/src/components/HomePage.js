import React, { Component } from 'react';
import AppTitle from './parts/AppTitle';
import HomePageHeader from './parts/HomePageHeader';
import HomePageBody from './parts/HomePageBody';

export default class IndexPage extends Component {
  render() {
    return (
      <div>
        <AppTitle/>
        <HomePageHeader />
        <HomePageBody />
      </div>
    );
  }
}
