import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pager from '../Pager/Pager';
import StartPage from '../StartPage/StartPage';
import SignInPage from '../SignInPage/SignInPage';
import constants from '../constants';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentWillMount () {
    const {idToken} = this.props;

    if (!idToken) {
      this.setState({
        loading: false
      });

      return;
    }

    const response = await fetch(`${constants.serverUrl}/check`, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    const responseData = await response.json();

    if (!responseData || !responseData.success) {
      this.props.dispatch({
        type: 'SET_ID_TOKEN',
        idToken: null
      });
    }

    this.setState({
      loading: false
    });
  }

  render () {
    let insideComponent;
    const {idToken, appStarted} = this.props;

    if (appStarted) {
      if (idToken) {
        insideComponent = <Pager/>;
      } else {
        insideComponent = <SignInPage/>;
      }
    } else {
      insideComponent = <StartPage/>;
    }

    return (
      <div className="main-container">
        {this.state.loading ? null : insideComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appStarted: state.appStarted,
  idToken: state.idToken
});

export default connect(mapStateToProps)(App);
