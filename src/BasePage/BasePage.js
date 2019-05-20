import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonNext from '../ButtonNext/ButtonNext';
import './BasePage.css';

class BasePage extends Component {
  constructor (props) {
    super(props);

    this._logOut = this.logOut.bind(this);
  }

  logOut () {
    localStorage.removeItem('id_token');

    this.props.dispatch({
      type: 'SET_ID_TOKEN',
      value: null
    });

    this.props.history.push('/questions/1/1');
  }

  render () {
    const {
      currentPage,
      totalPages,
      titleText,
      contentCmp,
      buttonOptions,
      monsterImg,
      needToHideLogout
    } = this.props;

    const logOutBtnClasses = 'on-form white-btn' + (needToHideLogout ? ' hidden' : '');

    return (
      <div className="base-page-container">
        <div className="top-wrapper">
          <div className="top-logo-wrapper">
            <img className="top-logo" src="/img/logo2.png" alt=""/>
            <div className="top-logo-label">
              Found your monsters
            </div>
          </div>
          <ButtonNext
            className={logOutBtnClasses}
            text='Log out'
            onClick={this._logOut}
          />
        </div>
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
  needToHideLogout: PropTypes.bool,
  buttonOptions: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    toRoute: PropTypes.string,
    className: PropTypes.string
  }).isRequired
};

export default withRouter(connect()(BasePage));
