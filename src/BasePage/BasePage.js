import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonNext from '../ButtonNext/ButtonNext';
import './BasePage.css';

class BasePage extends Component {
  render () {
    const {
      currentPage,
      totalPages,
      titleText,
      contentCmp,
      buttonOptions,
      monsterImg
    } = this.props;

    return (
      <div className="page-container">
        <img className="logo" src="/img/logo.png" alt=""/>
        <div className="form-wrapper">
          <div className="monster-img-wrapper">
            <img className="monster-img" src={monsterImg} alt=""/>
          </div>
          <div className="paginator">{currentPage} from {totalPages}</div>
          <div className="page-title">{titleText}</div>
          {contentCmp}
          <ButtonNext
            options={buttonOptions}
          />
        </div>
      </div>
    );
  }
}

BasePage.propTypes = {
  contentCmp: PropTypes.any,
  titleText: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  monsterImg: PropTypes.string,
  buttonOptions: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    toRoute: PropTypes.string,
    className: PropTypes.string
  }).isRequired
};

export default BasePage;
