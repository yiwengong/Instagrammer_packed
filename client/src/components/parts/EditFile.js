import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  paper_style_container:{
    height: 450,
    width: 300,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
  },
  text_style: {
    marginLeft: 20,
  },
  button_style: {
    margin:12,
  }
};


class EditFile extends Component {

  constructor(props) {
    super(props);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    return(
      <div>
        <TextField hintText = {field.label}
            floatingLabelText={field.label}
            errorText = {touched && error}
            {...field.input}
          />
      </div>
    );
  }

  handleFormSubmit({oldPassword,newPassword}) {
    this.props.changeUserPassword({oldPassword,newPassword});
  }

  render() {
    const {user} = this.props;
    const {handleSubmit, pristine, submitting } = this.props;
    return (
      <div className = "tab_container">
        <Paper style = {styles.paper_style_container} zDepth={1}>
          <div className="changePassword">
            Change Password
          </div>
          <form
            className="changePassword_container"
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
            >
              <Field
                label="Old Password"
                name="oldPassword"
                type="text"
                component = {this.renderField}
              />
              <Field
                label="New Password"
                name="newPassword"
                type="text"
                component = {this.renderField}
              />
              <Field
                label="Confirm Password"
                name="confirmPassword"
                type="text"
                component = {this.renderField}
              />
              <br/>
              <div className="error">
                {this.props.error}
              </div>
              <div className="message">
                {this.props.message}
              </div>
            <RaisedButton type="submit" label="Change Password" disabled={pristine || submitting} style={styles.button_style} />
          </form>
        </Paper>
      </div>
    );
  }
}

function validate(values) {
  const errors ={};

  if(!values.oldPassword) {
    errors.oldPassword = "Please enter your old password.";
  }

  if(!values.newPassword || values.newPassword.length < 7) {
    errors.newPassword ="Please enter a new password, at least 7 characters";
  }

  if(!values.confirmPassword) {
    errors.confirmPassword = "Please enter your password confirmation.";
  }

  if(values.newPassword != values.confirmPassword) {
    errors.newPassword = "Your passwords must match.";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    message:state.user.message
  };
}

export default reduxForm({
  form:'editFileForm',
  validate
})(
  connect(mapStateToProps, actions)(EditFile)
);
