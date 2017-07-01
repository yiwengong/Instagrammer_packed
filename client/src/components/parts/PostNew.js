import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

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

export default class PostNew extends Component {
  render() {
    return (
      <div className="postNew">
        <Paper style={styles.paper_style} zDepth={1}>
          <div className="title">Anything new?</div>
          <div className="content">
            <textarea name="" id="" cols="30" rows="5">
            </textarea>
          </div>
          <div className="buttons">
            <FlatButton
              label="Choose an Image"
              labelPosition="before"
              style={styles.uploadButton}
              containerElement="label"
            >
              <input type="file" style={styles.uploadInput} />
            </FlatButton>
            <div>
              <FlatButton
                label="Cancel"
                secondary={true}
                style={styles.raisedButton}
                containerElement={<Link to="/" />}
              />
              <FlatButton
                label="Post"
                primary={true}
                style={styles.raisedButton}
                containerElement={<Link to="/" />}
              />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
