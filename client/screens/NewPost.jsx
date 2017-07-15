import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PostForm from '../components/PostForm';
import { createPost, resetPost } from '../actions/post';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onChange = address => this.setState({ address });
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    const params = { ...values, address: this.state.address, email: this.props.email };
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        params.lat = latLng.lat;
        params.lng = latLng.lng;
        return params;
      })
      .catch((error) => { throw error; })
      .then(options => this.props.createPost(options),
      // success/fail modal
      )
      .catch(err => console.error(err))
      .then(() => this.props.resetPost())
      .catch(err => console.error(err))
      .then(() => { this.props.history.push('/'); })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <div className="container">
        <h1>{'New Post'}</h1>
        <PostForm
          onSubmit={this.submit}
          address={this.state.address}
          onChangeInput={this.onChange}
        />
        <Link to="/">{'Back to Profile'}</Link>
      </div>
    );
  }
}
NewPost.defaultProps = {
  email: null,
};
NewPost.propTypes = {
  createPost: PropTypes.func.isRequired,
  resetPost: PropTypes.func.isRequired,
  email: PropTypes.string,
};

const mapStateToProps = ({ user }) => ({
  ...user,
});

export default connect(mapStateToProps, { createPost, resetPost })(NewPost);
