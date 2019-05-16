import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import constants from '../constants';
import BasePage from '../BasePage/BasePage';
import './Step_2_1.css';

const styles = {
  root: {
    '&$checked': {
      color: '#7ec69a',
    },
  },
  checked: {}
};

class Step_2_1 extends Component {
  constructor (props) {
    super(props);

    this.step = 2;
    this.questionNumber = 1;

    const possibleAnswers = constants.possibleAnswers[this.step][this.questionNumber];

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
    const answers = this.props.answers;

    answers[this.step] = [
      this.state.selectedValue
    ];

    this.props.dispatch({
      type: 'CHANGE_ANSWERS',
      value: answers
    });

    this.props.history.push('/questions/2/2');
  }

  render () {
    const { classes } = this.props;

    const contentCmp = (
      <RadioGroup
        className="radio-group-2-1"
        value={this.state.selectedValue}
        onChange={this._handleChange}
      >
        {this.state.possibleAnswers.map((el, index) => {
          return (
            <FormControlLabel
              key={index}
              value={el}
              className="radio-label"
              control={
                <Radio
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                />}
              label={el}
            />
          );
        })}
      </RadioGroup>
    );

    return (
      <BasePage
        titleText="Are you afraid of the dark?"
        currentPage={this.step}
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

const mapStateToProps = state => ({
  answers: state.answers
});

export default connect(mapStateToProps)(withStyles(styles)(Step_2_1));
