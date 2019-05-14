import React, { Component } from 'react';
// import constants from '../constants';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BasePage from '../BasePage/BasePage';
import './MainQuestions.css';

class MainQuestions extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedValue: `I'm not scared at all`
    };

    this._handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    this.setState({
      selectedValue: e.target.value
    });
  }

  render () {
    const contentCmp = (
      <RadioGroup
        className="radio-group-2-4-1"
        name="step_2_4_1"
        value={this.state.selectedValue}
        onChange={this._handleChange}
      >
        <FormControlLabel
          value="I'm not scared at all"
          control={<Radio />}
          label="I'm not scared at all"
        />
        <FormControlLabel
          value="Sometimes"
          control={<Radio />}
          label="Sometimes"
        />
        <FormControlLabel
          value="Never"
          control={<Radio />}
          label="Never"
        />
        <FormControlLabel
          value="What a stupid question!"
          control={<Radio />}
          label="What a stupid question!"
        />
      </RadioGroup>
    );

    return (
      <BasePage
        titleText="Are you afraid of the dark?"
        currentPage={2}
        totalPages={4}
        contentCmp={contentCmp}
        monsterImg="img/page_3_monster.png"
        buttonOptions={{
          className: 'on-form',
          text: 'Next',
          // onClick: this._sendAuthRequest
        }}
      />
    );
  }
}

export default MainQuestions;
