import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// other components
import SigninPage from './SigninPage';
import SignupPage from './SignupPage';
import IndexPage from './IndexPage';
import HomePage from './HomePage';
import NewPostPage from './NewPostPage';
import EditFilePage from './EditFilePage';
import RequireAuth from './require_auth';

//test
import Comments from './parts/IndexPageContents/comments';

// theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route path ="/test" component = {Comments}/>
              <Route path ="/signup" component = {SignupPage}/>
              <Route path ="/signin" component = {SigninPage}/>
              <Route path ="/editfile" component = {RequireAuth(EditFilePage)}/>
              <Route path ="/home" component = {RequireAuth(HomePage)}/>
              <Route path ="/newpost" component = {RequireAuth(NewPostPage)}/>
              <Route path ="/" component = {RequireAuth(IndexPage)}/>
            </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
