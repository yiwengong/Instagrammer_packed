import React, { Component } from 'react';
import AppTitle from './parts/AppTitle';
import AccountPageHeader from './parts/AccountPageHeader';
import AccountPageBody from './parts/AccountPageBody';

export default class AccountPage extends Component {
  render() {
    return (
      <div>
        <AppTitle/>
        <AccountPageHeader match={this.props.match}/>
        <AccountPageBody />
      </div>
    );
  }
}
