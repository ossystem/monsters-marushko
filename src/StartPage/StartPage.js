import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonNext from '../ButtonNext/ButtonNext';
import './StartPage.css';

class StartPage extends Component {
  render () {
    return (
      <div className="container">
        <img className="top-logo" src="img/start_logo.png" alt=""/>
        <img className="all-monsters" src="img/page_1_monsters.png" alt=""/>
        <ButtonNext
          text="Start"
          toRoute="/questions"
        />
      </div>
    );
  }
}

export default connect()(StartPage);
