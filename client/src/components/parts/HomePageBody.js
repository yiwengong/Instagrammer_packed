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

const tilesData = [
  {
    img: '/images/image2.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: '/images/image3.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: '/images/image4.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: '/images/image5.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: '/images/image6.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: '/images/image7.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: '/images/image8.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridList
      cols={2}
      cellHeight={200}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);



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
