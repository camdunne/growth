import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfile } from '../actions/user';

class Splash extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getProfile();
  }
  render() {
    return (
      <div className="container">
        <Link to="/newpost">{'create new post'}</Link>
        <br />
        <Link to="/allposts">{'all postings'}</Link>
        <div>{'Hello user: '}{this.props.email}</div>
        <a href="/api/users/logout">{'log out'}</a>
      </div>
    );
  }
}
Splash.defaultProps = {
  email: null,
};
Splash.propTypes = {
  getProfile: PropTypes.func.isRequired,
  email: PropTypes.string,
};
const mapStateToProps = ({ user }) => ({ ...user });
export default connect(mapStateToProps, { getProfile })(Splash);
