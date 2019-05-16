import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@material-ui/icons';
import './ButtonNext.css';

const ButtonNext = props => {
  const {
    isDisabled,
    className,
    onClick,
    text,
    toRoute
  } = props.options || props;

  let btnClass = 'main-button' + (isDisabled ? ' disabled' : '');
  btnClass = btnClass + (className ? ` ${className}` : '');

  let btn = (
    <button
      type="button"
      className={btnClass}
      onClick={onClick || (() => {})}
    >
      <div className="internal-wrapper">
        {text}
        <ArrowForward/>
      </div>
    </button>
  );

  if (toRoute) {
    btn = (
      <Link to={toRoute}>
        {btn}
      </Link>
    );
  }

  return btn;
};

const possibleOptions = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  toRoute: PropTypes.string,
  className: PropTypes.string
};

ButtonNext.propTypes = PropTypes.oneOf([
  possibleOptions,
  { options: PropTypes.shape(possibleOptions).isRequired }
]).isRequired;

export default ButtonNext;
