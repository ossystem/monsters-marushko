import React, { Component } from 'react';
import constants from '../constants';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this._sendAuthRequest = this.sendAuthRequest.bind(this);
    this._onFieldChangeValue = this.onFieldChangeValue.bind(this);
  }

  async sendAuthRequest () {
    const {email, password} = this.state;

    const response = await fetch(`${constants.serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      body: JSON.stringify({
        email,
        password
      })
    });

    const responseData = await response.json();

    if (!responseData || !responseData.success || !responseData.id_token) {
      return;
    }

    localStorage.setItem('id_token', responseData.id_token);

    // TODO: Show working page after login
  }

  onFieldChangeValue (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    return (
      <div className="App">
        <h1>React application</h1>
        <form action="/">
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            onChange={this._onFieldChangeValue}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this._onFieldChangeValue}
          />
          <button
            type="button"
            onClick={this._sendAuthRequest}
          >
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default App;
