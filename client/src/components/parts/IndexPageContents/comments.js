import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CommentInput from './commentInput';

const style = {
  width: 550,
  margin: 0,
  textAlign: 'center',
  display: 'inline-block',
};


export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    return (
    <div className="post_container" >
      <Card style = {style} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardText>
          <FlatButton label="load more comments" onTouchTap={this.handleExpand} />
          <FlatButton label="hide more comments" onTouchTap={this.handleReduce} />
        </CardText>
        <CardText expandable={true}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </CardText>
        <CardText>
          <CommentInput postid={this.props.postid}/>
        </CardText>
      </Card>
    </div>
    );
  }
}
