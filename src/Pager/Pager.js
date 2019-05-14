import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInPage from '../SignInPage/SignInPage';
import MainQuestions from '../MainQuestions/MainQuestions';
import './Pager.css';

class Pager extends Component {
  render () {
    return this.props.idToken ? <MainQuestions/> : <SignInPage/>;
  }
}

const mapStateToProps = state => ({
  idToken: state.idToken
});

export default connect(mapStateToProps)(Pager);
