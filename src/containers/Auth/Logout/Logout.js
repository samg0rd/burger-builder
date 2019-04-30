import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import * as actions from '../../../store/actions/index';

class Logout extends Component {

  componentDidMount() {
    this.props.onLogout();

  }
  

  render() {
    // whenever this component it just redirects us where we want ( home probably )
    return <Redirect to="/"/>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null,mapDispatchToProps)(Logout);