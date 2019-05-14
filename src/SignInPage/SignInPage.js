import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import BasePage from '../BasePage/BasePage';
import constants from '../constants';
import './SignInPage.css';

class SignInPage extends Component {
  constructor (props) {
    super(props);

    // this.emailInput = React.createRef();
    // this.passwordInput = React.createRef();

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
    const contentCmp = (
      <div>
        <Input
          placeholder="Your Email"
          type="text"
          name="email"
          className="text-field email"
          onChange={this._onFieldChangeValue}
          // ref={this.emailInput}
        />
        <Input
          placeholder="Your password"
          type="password"
          name="password"
          className="text-field password"
          onChange={this._onFieldChangeValue}
          // ref={this.passwordInput}
        />
      </div>
    );

    return (
      <BasePage
        titleText="Start by Signup"
        currentPage={1}
        totalPages={4}
        contentCmp={contentCmp}
        monsterImg="img/page_2_monster.png"
        buttonOptions={{
          className: 'on-form',
          text: 'Next',
          onClick: this._sendAuthRequest
        }}
      />
    );
  }
}

export default connect()(SignInPage);
