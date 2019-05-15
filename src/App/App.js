import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import StartPage from '../StartPage/StartPage';
import SignInPage from '../SignInPage/SignInPage';
import Step_2_1 from '../Step_2_1/Step_2_1';
import Step_2_2 from '../Step_2_2/Step_2_2';
import Step_3_1 from '../Step_3_1/Step_3_1';
import Step_4_1 from '../Step_4_1/Step_4_1';
import ResultsPage from '../ResultsPage/ResultsPage';
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
          <Route path="/questions/1/1" component={SignInPage}/>
          <Route path="/questions/2/1" component={Step_2_1}/>
          <Route path="/questions/2/2" component={Step_2_2}/>
          <Route path="/questions/3/1" component={Step_3_1}/>
          <Route path="/questions/4/1" component={Step_4_1}/>
          <Route path="/results" component={ResultsPage}/>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  idToken: state.idToken
});

export default connect(mapStateToProps)(App);
