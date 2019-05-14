import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ButtonNext.css';

const ButtonNext = props => {
  const btnClass = 'main-button' + (props.isDisabled ? ' disabled' : '');

  let btn = (
    <button
      type="button"
      className={btnClass}
      onClick={props.onClick || (() => {})}
    >
      {props.text}
    </button>
  );

  if (props.toRoute) {
    btn = (
      <Link to={props.toRoute}>
        {btn}
      </Link>
    );
  }

  return btn;
};

ButtonNext.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  toRoute: PropTypes.string
};

export default ButtonNext;
