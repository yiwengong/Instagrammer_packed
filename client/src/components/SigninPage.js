import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/auth_actions';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

//paper generate
const style_paper1 = {
  height: 500,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const style_button = {
  margin: 12,
};

class SigninPage extends Component {
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

  handleFormSubmit({email, password}){
    this.props.sigininUser({email,password}, () => {
      this.props.history.push('/');
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="error">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="login_paper">
          <Paper style={style_paper1} zDepth={1}>
            <div className="login_title">Instagrammer</div>
              <Field
                label="Email"
                name="email"
                type="text"
                component = {this.renderField}
              />
              <Field
                label="Password"
                name="password"
                type="password"
                component = {this.renderField}
              />
              <br/>
              <br/>
              {this.renderAlert()}
              <div>
                <RaisedButton
                  type="submit"
                  label="Login"
                  primary={true}
                  style={style_button}
                />
              </div>
            <div className="sperateLine">---------------------------OR---------------------------</div>
            <div className="signup">
              <div className="signup_words">Don't have an accout?</div>
              <FlatButton
                label="Sign up"
                primary={true}
                containerElement={<Link to="/signup" />}
              />
            </div>
          </Paper>
        </div>
      </form>

    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form:'signinPage'
})(
  connect(mapStateToProps, actions)(SigninPage)
);
