import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import TextField from 'material-ui/TextField';


const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;


const style = {
  height: 800,
  width: 550,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export default class Postdiy extends Component {
  constructor(props) {
      super(props);
      this.state = {selectedIndex: 0};
  }

  select(index) {
      this.setState({selectedIndex: index});
  }

  render() {
    return(
      <div className="post_container">
        <Paper style={style} zDepth={1}>
          <Card>
              <CardHeader
                  title="User Name"
                  subtitle = "Location"
                  avatar = "/images/image1.jpg"
              />
              <CardMedia>
                  <img src="/images/image2.jpg" alt=""/>
              </CardMedia>
          </Card>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
              {/* <BottomNavigationItem
                  label="Recents"
                  icon={recentsIcon}
                  onTouchTap={() => this.select(0)}
              /> */}
              <BottomNavigationItem
                  label="Favorites"
                  icon={favoritesIcon}
                  onTouchTap={() => this.select(1)}
              />
              {/* <BottomNavigationItem
                  label="Nearby"
                  icon={nearbyIcon}
                  onTouchTap={() => this.select(2)}
              /> */}
          </BottomNavigation>
          <div className="likes_container"></div>
          <div className="comments_container">
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="add_comment">
            <TextField hintText="Add a comment..."/><br />
          </div>

        </Paper>
      </div>
    );
  }

}
