import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import ChangeAvatar from './EditFiles/ChangeAvatar';
import ChangePassword from './EditFiles/ChangePassword';

const styles = {
  paper_style_container:{
    height: 450,
    width: 300,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
  },
};


 export default class EditFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
  
  render() {

    const {user} = this.props;
    const {handleSubmit, pristine, submitting } = this.props;
    return (
      <div className = "tab_container">
        <Paper style = {styles.paper_style_container} zDepth={1}>
          <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="Change Avatar" value="a">
                <ChangeAvatar/>
              </Tab>
              <Tab label="Change Password" value="b">
                <ChangePassword/>
              </Tab>
            </Tabs>
        </Paper>
      </div>
    );
  }
}
