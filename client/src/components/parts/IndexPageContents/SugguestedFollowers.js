import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers,changeFollowing} from '../../../actions/user_actions';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  paper:{
    height: 350,
    width: 550,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  checkbox: {
    marginBottom: 16,
  }

};



class SugguestedFollower extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedIndex: 0,
      };

      this.handleFollow = this.handleFollow.bind(this);
  }

  select(index) {
      this.setState({selectedIndex: index});
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  handleFollow(userId) {
    this.props.changeFollowing(userId,() =>{
      console.log(userId)
    });
  }

  renderList() {
    const users = this.props.users;
    if(users) {
      return(
        <List>
          <Subheader>Suggestion For You</Subheader>
          {users.map((user)=>(
            <ListItem
              disabled={true}
              key={user._id}
              primaryText={user.username}
              leftAvatar={<Avatar src={user.avatar.substring(10)} />}
              rightIcon={
                <Checkbox
                  labelPosition="right"
                  style={styles.checkbox}
                  onCheck = {() => {this.handleFollow(user._id)}}
                />
              }
            />
          ))}
        </List>
      )
    }else{
      return(
        <div>Loading...</div>
      );
    }
  }

  render() {
    return(
      <div className="post_container">
        <Paper style={styles.paper} zDepth={1}>
          {this.renderList()}
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users
  }
}

export default connect(mapStateToProps, {fetchUsers,changeFollowing})(SugguestedFollower);
