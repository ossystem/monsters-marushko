import React from 'react';
import PropTypes from 'prop-types';
import './ButtonNext.css';

const ButtonNext = props => {
  const btnClass = "wrapper" + (props.isDisabled ? " disabled" : "");

  return (
    <div className={btnClass}>
      {props.text}
    </div>
  );
};

ButtonNext.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool
};

export default ButtonNext;
