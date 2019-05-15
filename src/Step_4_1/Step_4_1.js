import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from '@material-ui/lab/Slider';
import FormLabel from '@material-ui/core/FormLabel';
import BasePage from '../BasePage/BasePage';
import constants from '../constants';
import './Step_4_1.css';

class Step_4_1 extends Component {
  constructor (props) {
    super(props);

    this.step = 4;
    this.questionNumber = 1;

    this.state = {
      value: 50
    };

    this._handleChange = this.handleChange.bind(this);
    this._nextPage = this.nextPage.bind(this);
  }

  handleChange (e, value) {
    this.setState({
      value
    });
  }

  async nextPage () {
    const {answers, idToken} = this.props;

    answers[this.step] = [
      (this.state.value >= 50) ? 'Bad monster' : 'Good monster'
    ];

    this.props.dispatch({
      type: 'CHANGE_ANSWERS',
      value: answers
    });

    this.props.history.push('/results');

    try {
      fetch(`${constants.serverUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        cache: 'no-cache',
        body: JSON.stringify(answers)
      });
    } catch (ex) {
      console.error(ex);
    }
  }

  render () {
    const contentCmp = (
      <div className="slider-4-1">
        <FormLabel className="form-label">Good monster</FormLabel>
        <Slider
          className="slider"
          value={this.state.value}
          onChange={this._handleChange}
        />
        <FormLabel className="form-label">Bad monster</FormLabel>
      </div>
    );

    return (
      <BasePage
        titleText="You'd rather be a bad or&#10;a good monster"
        currentPage={this.step}
        totalPages={4}
        contentCmp={contentCmp}
        monsterImg="/img/page_8_monster.png"
        buttonOptions={{
          className: 'on-form green-btn',
          text: 'Submit',
          onClick: this._nextPage
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  answers: state.answers,
  idToken: state.idToken
});

export default connect(mapStateToProps)(Step_4_1);
