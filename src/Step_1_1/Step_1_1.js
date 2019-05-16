import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import BasePage from '../BasePage/BasePage';
import constants from '../constants';
import './Step_1_1.css';

const styles = {
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#8cbe82',
    }
  }
};

class Step_1_1 extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formIsValid: false
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

    this.props.history.push('/questions/2/1');
  }

  onFieldChangeValue (e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.setState({
        formIsValid: !!(this.state.email && this.state.password)
      });
    });
  }

  render () {
    const  { classes } = this.props;

    const contentCmp = (
      <div>
        <Input
          placeholder="Your Email"
          type="text"
          name="email"
          className="text-field email"
          onChange={this._onFieldChangeValue}
          classes={{
            root: classes.root,
            underline: classes.cssUnderline,
          }}
        />
        <Input
          placeholder="Your password"
          type="password"
          name="password"
          className="text-field password"
          onChange={this._onFieldChangeValue}
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </div>
    );

    return (
      <BasePage
        titleText="Start by Signup"
        currentPage={1}
        totalPages={4}
        contentCmp={contentCmp}
        monsterImg="/img/page_2_monster.png"
        needToHideLogout={true}
        buttonOptions={{
          className: 'on-form',
          text: 'Next',
          onClick: this._sendAuthRequest,
          isDisabled: !this.state.formIsValid
        }}
      />
    );
  }
}

export default connect()(withStyles(styles)(Step_1_1));
