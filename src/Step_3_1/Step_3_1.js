import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import constants from '../constants';
import BasePage from '../BasePage/BasePage';
import './Step_3_1.css';

class Step_3_1 extends Component {
  constructor (props) {
    super(props);

    this.step = 3;
    this.questionNumber = 1;

    const possibleAnswers = constants.possibleAnswers[this.step][this.questionNumber];

    this.state = {
      possibleAnswers,
      selectedValue: true
    };

    this._handleChange = this.handleChange.bind(this);
    this._nextPage = this.nextPage.bind(this);
  }

  handleChange () {
    this.setState({
      selectedValue: !this.state.selectedValue
    });
  }

  nextPage () {
    const answers = this.props.answers;

    answers[this.step] = [
      this.state.possibleAnswers[+this.state.selectedValue]
    ];

    this.props.dispatch({
      type: 'CHANGE_ANSWERS',
      value: answers
    });

    this.props.history.push('/questions/4/1');
  }

  render () {
    const contentCmp = (
      <div className="toggler-3-1">
        <FormLabel>Day monster</FormLabel>
        <Switch
          className="toggler"
          checked={this.state.selectedValue}
          onChange={this._handleChange}
        />
        <FormLabel>Night Monster</FormLabel>
      </div>
    );

    return (
      <BasePage
        titleText="Are you a monster day or&#10;a night monster?"
        currentPage={this.step}
        totalPages={4}
        contentCmp={contentCmp}
        monsterImg="/img/page_7_monster.png"
        buttonOptions={{
          className: 'on-form',
          text: 'Next',
          onClick: this._nextPage
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  answers: state.answers
});

export default connect(mapStateToProps)(Step_3_1);
