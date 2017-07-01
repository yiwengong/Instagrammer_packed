import React, { Component } from 'react';
import AppTitle from './parts/AppTitle';
import EditFile from './parts/EditFile';

export default class EditFilePage extends Component {
  render() {
    return (
      <div>
        <AppTitle />
        <EditFile />
      </div>
    );
  }
}
