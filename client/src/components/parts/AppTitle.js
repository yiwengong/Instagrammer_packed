// imports for AppTitle.js
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';


const styles = {
  mediumIcon: {
    width:36,
    height:36,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  addButton:{
    marginRight: 20,
  }
};


class AppTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="appTitle">
            <div className="title_container">
              <a className="title_button" href="/">Instagrammer</a>
            </div>
            <div className="searchBar_container">
              <input type="text" className="searchBar" placeholder="Search" />
            </div>

              <div className="home_button">
                <IconButton
                  iconStyle={styles.mediumIcon}
                  style={styles.medium}
                  containerElement={<Link to="/home" />}
                >
                  <ActionHome />
                </IconButton>
              </div>
              <div className="home_button">
                <FloatingActionButton
                  mini={true}
                  containerElement={<Link to="/newPost" />}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </div>



          </div>
        );
    }
}

export default AppTitle;