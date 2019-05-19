import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonNext from '../ButtonNext/ButtonNext';
import './StartPage.css';

class StartPage extends Component {
  render () {
    return (
      <div className="container">
        <img className="top-logo" src="img/logo.png" alt=""/>
        <div className="top-logo-label">
          Found your monsters
        </div>
        <img className="all-monsters" src="/img/page_1_monsters.png" alt=""/>
        <img className="all-monsters-mob" src="/img/page_mob_1_monsters.png" alt=""/>
        <ButtonNext
          text="Start"
          toRoute={this.props.idToken ? "/questions/2/1" : "/questions/1/1"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  idToken: state.idToken
});

export default connect(mapStateToProps)(StartPage);
