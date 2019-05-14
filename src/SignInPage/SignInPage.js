import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonNext from '../ButtonNext/ButtonNext';
import constants from '../constants';
import './SignInPage.css';

class SignInPage extends Component {
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

    let responseData = await response.json();
    const {success, id_token: idToken} = responseData || {};

    if (!success || !idToken) {
      return;
    }

    localStorage.setItem('id_token', idToken);

    this.props.dispatch({
      type: 'SET_ID_TOKEN',
      idToken: idToken
    });
  }

  onFieldChangeValue (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    return (
      <div className="signin-page-container">
        <img className="logo" src="img/logo.png" alt=""/>
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
          <ButtonNext
            text="Next"
            onClick={this._sendAuthRequest}
          />
        </form>
      </div>
    );
  }
}

export default connect()(SignInPage);
