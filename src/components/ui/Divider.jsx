import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({
  label,
}) => (
  <div className="divider-line-container">
    <div className="divider-line" />
    <p>{label}</p>
    <div className="divider-line" />
  </div>
);

Divider.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Divider;
