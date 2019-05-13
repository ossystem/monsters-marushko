import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pager from '../Pager/Pager';
import StartPage from '../StartPage/StartPage';
import SignInPage from '../SignInPage/SignInPage';
import './App.css';

class App extends Component {
  render () {
    let insideComponent;
    const {idToken, appStarted} = this.props;

    if (appStarted) {
      if (idToken) {
        insideComponent = <Pager/>;
      } else {
        insideComponent = <SignInPage/>
      }
    } else {
      insideComponent = <StartPage/>;
    }

    return (
      <div className="main-container">
        {insideComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appStarted: state.appStarted,
  idToken: state.idToken
});

export default connect(mapStateToProps)(App);
