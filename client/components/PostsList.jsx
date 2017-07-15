import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchPost } from '../actions/post';

const PostsList = ({ posts }) => (
  <div>
    {posts.map(post => (
      <div key={post.id} style={{ height: '150px', width: '100%' }}>
        <Link to={`/post/${post.id}`}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <div>{moment.utc(post.createdAt).fromNow()}</div>
        </Link>
      </div>
      ))}
  </div>
    );

PostsList.defaultProps = {
  posts: [],
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
  })),
};

const mapStateToProps = ({ posts }) => ({
  ...posts,
});

export default connect(mapStateToProps, { fetchPost })(PostsList);
