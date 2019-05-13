import React, {Component} from 'react';
import {connect} from 'react-redux';
import ButtonNext from '../ButtonNext/ButtonNext';
import './StartPage.css';

class StartPage extends Component {
  constructor (props) {
    super(props);

    this._runApp = this.runApp.bind(this);
  }

  runApp () {
    this.props.dispatch({
      type: 'RUN_APP'
    });
  };

  render () {
    return (
      <div className="container">
        <img className="top-logo" src="img/start_logo.png" alt=""/>
        <img className="all-monsters" src="img/page_1_monsters.png" alt=""/>
        <ButtonNext
          text="Start"
          onClick={this._runApp}
        />
      </div>
    );
  }
}

export default connect()(StartPage);
