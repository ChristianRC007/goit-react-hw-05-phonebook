import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './Filter.scss';

const Filter = ({ value, onChange, isAppeared }) => {
  return (
    <CSSTransition in={isAppeared} timeout={200} classNames="pop" unmountOnExit>
      <label className="filter">
        <span>Find contacts by name</span>
        <input
          className="filter__input"
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </CSSTransition>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
