import React, { Component } from 'react';
import constants from '../constants';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BasePage from '../BasePage/BasePage';
import './Step_2_1.css';

class Step_2_1 extends Component {
  constructor (props) {
    super(props);

    const possibleAnswers = constants.possibleAnswers[2][1];

    this.state = {
      possibleAnswers,
      selectedValue: possibleAnswers[0]
    };

    this._handleChange = this.handleChange.bind(this);
    this._nextPage = this.nextPage.bind(this);
  }

  handleChange (e) {
    this.setState({
      selectedValue: e.target.value
    });
  }

  nextPage () {
    debugger;
  }

  render () {
    const contentCmp = (
      <RadioGroup
        className="radio-group-2-1"
        value={this.state.selectedValue}
        onChange={this._handleChange}
      >
        {this.state.possibleAnswers.map((el, index) => {
          return (
            <FormControlLabel key={index}
              value={el}
              control={<Radio />}
              label={el}
            />
          );
        })}
      </RadioGroup>
    );

    return (
      <BasePage
        titleText="Are you afraid of the dark?"
        currentPage={2}
        totalPages={4}
        contentCmp={contentCmp}
        monsterImg="/img/page_3_monster.png"
        buttonOptions={{
          className: 'on-form',
          text: 'Next',
          onClick: this._nextPage
        }}
      />
    );
  }
}

export default Step_2_1;
