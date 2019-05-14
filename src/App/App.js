import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import StartPage from '../StartPage/StartPage';
import Pager from '../Pager/Pager';
import constants from '../constants';
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  async componentWillMount () {
    const {idToken} = this.props;

    if (!idToken) {
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
  }

  render () {
    return (
      <div className="main-container">
        <Router history={history}>
          <Route path="/" exact component={StartPage}/>
          <Route path="/questions" component={Pager}/>
          <Route path="/results" component={null}/>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  idToken: state.idToken
});

export default connect(mapStateToProps)(App);
