import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';



const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 750,
    height: 600,
    overflowY: 'auto',
  },
};

class HomePageBody extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPost() {
    if(this.props.posts){
      return (
        <div style={styles.root}>
          <GridList
            cols={2}
            cellHeight={200}
            style={styles.gridList}
          >
            {this.props.posts.map((post) => (
              <GridTile
                key={post._id}
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={post.image.substring(9)} />
              </GridTile>
            ))}
          </GridList>
        </div>
      );
    }else{
      <div>Loading...</div>
    }
  }

  render() {
    return(
      <div>
        {this.renderPost()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {posts: state.posts.postsInfo}
}

export default connect(mapStateToProps,actions)(HomePageBody);
