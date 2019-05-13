import React, {Component} from 'react';
import Pager from '../Pager/Pager';
import StartPage from '../StartPage/StartPage';
import SignInPage from '../SignInPage/SignInPage';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      idToken: localStorage.getItem('id_token'),
      appStarted: false
    };

    // this._showNextPage = this.showNextPage.bind(this);
  }

  // showNextPage () {
  //
  // }

  render () {
    let insideComponent;
    const {idToken, appStarted} = this.state;

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

export default App;
