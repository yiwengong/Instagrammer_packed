import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {onSearchTermChange} from '../../actions/user_actions';

import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

class SearchTerm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      term: ''
    };
  }

  onInputChange = (event) => {

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      term: event.target.value
    });
    this.props.onSearchTermChange(event.target.value);
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  renderMatchedUser() {
    const {users} = this.props;
    if(users && users.length !== 0) {
      return(
        <div>
          <List>
            {users.map((user) =>(
              <ListItem
                key = {user._id}
                primaryText= {user.username}
                leftAvatar={
                  <Avatar src={user.avatar.substring(10)} />
                }
                containerElement= {<Link to ={`/${user.username}`}/>}
              />
            ))}
          </List>
        </div>
      );
    }else if (users && users.length === 0){
       return(
         <div>
           <List>
            <ListItem
              primaryText= "No results."
            />
           </List>
         </div>
       );
    }else {
      return(
        <div>Loading...</div>
      );
    }
  }

  render() {
    return (
      <div>
        <input
          className="searchBar"
          type="text"
          placeholder="Search"
          value = {this.state.term}
          onChange = {event => this.onInputChange(event)}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          {this.renderMatchedUser()}
        </Popover>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {users: state.user.matchedUsers};
}

export default connect (mapStateToProps, {onSearchTermChange})(SearchTerm)
