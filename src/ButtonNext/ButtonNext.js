import React from 'react';
import PropTypes from 'prop-types';
import './ButtonNext.css';

const ButtonNext = props => {
  const btnClass = 'main-button' + (props.isDisabled ? ' disabled' : '');

  return (
    <button
      type="button"
      className={btnClass}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

ButtonNext.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default ButtonNext;
