import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../components/Map';
import { fetchPost } from '../actions/post';


class ViewPost extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const id = this.props.location.pathname.slice(6);
    this.props.fetchPost(id);
  }
  render() {
    if (this.props.fetched) {
      const { currentPost } = this.props;
      return (
        <div>
          <div>{currentPost.title}</div>
          <div>{currentPost.body}</div>
          <div>by user: {currentPost.email}</div>
          <div>{currentPost.createdAt}</div>
          <div>{currentPost.address}</div>
          <Map
            key={Math.random()}
            fetched={this.props.fetched}
            lat={currentPost.lat}
            lng={currentPost.lng}
          />
        </div>
      );
    }
    return (<div />);
  }
}

ViewPost.defaultProps = {
  fetched: false,
  currentPost: null,
};

ViewPost.propTypes = {
  fetched: PropTypes.bool,
  fetchPost: PropTypes.func.isRequired,
  currentPost: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    authorId: PropTypes.number,
    createdAt: PropTypes.string,
    address: PropTypes.string,
  }),
};

const mapStateToProps = ({ post }) => ({
  ...post,
});


export default connect(mapStateToProps, { fetchPost })(ViewPost);
