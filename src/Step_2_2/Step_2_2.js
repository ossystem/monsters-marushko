import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import constants from '../constants';
import BasePage from '../BasePage/BasePage';
import './Step_2_2.css';

class Step_2_2 extends Component {
  constructor (props) {
    super(props);

    this.step = 2;
    this.questionNumber = 2;

    const possibleAnswers = constants.possibleAnswers[this.step][this.questionNumber];

    this.state = {
      possibleAnswers,
      selectedValues: []
    };

    this._handleChange = this.handleChange.bind(this);
    this._nextPage = this.nextPage.bind(this);
  }

  handleChange (value) {
    return e => {
      const selectedValues = [...this.state.selectedValues];

      if (e.target.checked) {
        selectedValues.push(value);
      } else {
        const index = selectedValues.findIndex(i => i === value);

        if (index >= 0) {
          selectedValues.splice(index, 1);
        }
      }

      this.setState({
        selectedValues: selectedValues
      });
    };
  }

  nextPage () {
    const answers = this.props.answers;

    answers[this.step].push(this.state.selectedValues.join(', '));

    this.props.dispatch({
      type: 'CHANGE_ANSWERS',
      value: answers
    });

    this.props.history.push('/questions/3/1');
  }

  render () {
    const contentCmp = (
      <FormGroup className="checkbox-group-2-2">
        {this.state.possibleAnswers.map((el, index) => {
          return (
            <FormControlLabel
              key={index}
              label={el}
              control={
                <Checkbox
                  onChange={this._handleChange(el)}
                />
              }
            />
          );
        })}
      </FormGroup>
    );

    return (
      <BasePage
        titleText="what do you prefer?"
        currentPage={this.step}
        totalPages={4}
        contentCmp={contentCmp}
        monsterImg="/img/page_4_monster.png"
        buttonOptions={{
          className: 'on-form',
          text: 'Next',
          onClick: this._nextPage,
          isDisabled: !this.state.selectedValues.length
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  answers: state.answers
});

export default connect(mapStateToProps)(Step_2_2);
