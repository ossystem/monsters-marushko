import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ResultsPage.css';

class ResultsPage extends Component {
  render () {
    const {answers} = this.props;
    const answersCmp = Object.keys(answers).map(i => {
      return answers[i].map((j, index) => {
        return (
          <div
            key={index}
            className="answer-point"
          >
            {j}
          </div>
        );
      });
    });

    return (
      <div className="page-container">
        <div className="top-wrapper">
          <div className="top-logo-wrapper">
            <img className="top-logo" src="/img/logo2.png" alt=""/>
            <div className="top-logo-label">
                Found your monsters
            </div>
          </div>
        </div>
        <div className="page-title">Excellent, congratulations, you're a monster</div>
        <div className="page-title mob">Excellent,&#10;congratulations,&#10;you're a monster</div>
        <div className="results-content">
          <div className="form-wrapper">
            <div className="paginator">You'r</div>
            <div className="answers-points">
              {answersCmp}
            </div>
          </div>
          <div className="monster-img-wrapper">
            <img className="monster-img" src="/img/page_9_monster.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  answers: state.answers
});

export default connect(mapStateToProps)(ResultsPage);
