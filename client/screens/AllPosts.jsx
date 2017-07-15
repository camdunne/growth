import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/post';
import PostsList from '../components/PostsList';

class AllPosts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    if (!this.props.fetched) {
      return (
        <div>
          {'loading...'}
        </div>
      );
    }
    return (
      <div>
        <Link to="/"> {'Home'} </Link>
        <PostsList posts={this.props.allPosts} />
      </div>
    );
  }
}

AllPosts.defaultProps = {
  fetched: null,
  allPosts: [],
};

AllPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  fetched: PropTypes.bool,
  allPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
  })),
};

const mapStateToProps = ({ post }) => ({
  ...post,
});


export default connect(mapStateToProps, { getPosts })(AllPosts);
