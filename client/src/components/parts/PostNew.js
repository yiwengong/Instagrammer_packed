import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText } from 'material-ui';
import {connect} from 'react-redux';
import * as actions from '../../actions';

const styles = {
  paper_style :{
    height: 450,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  raisedButton: {
    margin: 12,
  },
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class PostNew extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const file = document.getElementById('myFileInput').files[0];
    const content = document.getElementById('myContent').value;
    data.append('posts', file);
    data.append('content', content);
    this.props.createNewPost(data, () => {
      this.props.history.push('/');
    });
  }

  render() {
    console.log(this.props);
    return (
      <form className="postNew" onSubmit={this.handleSubmit}>
        <Paper style={styles.paper_style} zDepth={1}>
          <div className="title">Anything new?</div>
          <div className="input_container">
            <input type="file" id= "myFileInput" />
          </div>
          <div className="content">
            <textarea name="" id="myContent" cols="30" rows="5"></textarea>
          </div>
          <br/>
          <div className="error">
            {this.props.errorMessage}
          </div>

          <div className="buttons">
            <div>
              <FlatButton
                label="Cancel"
                secondary={true}
                style={styles.raisedButton}
                href ="/"
              />
              <FlatButton
                label="Post"
                primary={true}
                style={styles.raisedButton}
                type="submit"
              />
            </div>
          </div>
        </Paper>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.posts.error};
}

export default connect(mapStateToProps, actions)(PostNew)
