import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const style = {
  height: 200,
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
          <br/>
          <h4>Welcome to Instagram!</h4>
          <br/>
          <p>Follow accounts to see photos and videos in your feed.</p>
        </Paper>
      </div>
    );
  }

}
