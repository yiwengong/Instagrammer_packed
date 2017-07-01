import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

//material-ui
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


//paper generate
const styles = {
  style_paper1:{
    height: 590,
    width: 300,
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
  },
  style_text: {
     marginLeft: 20,
  }
};


class SignupPage extends Component {

  componentDidMount(){
    this.props.clearError();
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

  handleFormSubmit({email, username, password}) {
    //actions-signup
    this.props.signupUser({email, username, password}, () => {
      this.props.history.push('/');
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className="error">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit ={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="signup_paper">
          <Paper style={styles.style_paper1} zDepth={1}>
            <div className="signup_title">Instagrammer</div>
              <Field
                label="Email"
                name="email"
                type="text"
                component = {this.renderField}
              />
              <Field
                label="Username"
                name="username"
                type="text"
                component = {this.renderField}
              />
              <Field
                label="Password"
                name="password"
                type="password"
                component = {this.renderField}
              />
              <Field
                label="Confirm Password"
                name="confimpassword"
                type="password"
                component = {this.renderField}
              />
              <br/>
            {this.renderAlert()}
            <FlatButton
              type="button"
              label="Cancel"
              containerElement ={<Link to ="/signin"/>}
              secondary={true}
            />
            <FlatButton
              type="submit"
              label="Sign up"
              primary={true}
              />
          </Paper>
        </div>
      </form>

    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = "Please enter a valid email.";
  }
  if(!values.username){
    errors.username = "Please enter a username.";
  }
  if(!values.password|| values.password.length < 7){
    errors.password = "Please enter a password, at least 7 characters";
  }

  if(!values.confimpassword){
    errors.confimpassword = "Please enter a password confirmation.";
  }

  if(values.password != values.confimpassword) {
    errors.password = "Passwords must match"
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error};
}

export default reduxForm({
  form:'signupPage',
  validate
})(
  connect(mapStateToProps, actions)(SignupPage)
);
