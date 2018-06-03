import React from 'react';
import PropTypes from 'prop-types';

const PlantProjectSpecsItem = ({ label, value, icon }) => {
  return (
    <div className="project-specs__item">
      {icon ? <img src={icon} /> : <span>{label}</span>}
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

PlantProjectSpecsItem.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string
};

export default PlantProjectSpecsItem;
