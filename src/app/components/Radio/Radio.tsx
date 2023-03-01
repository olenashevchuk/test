import IRadio from './IRadio';
import React from 'react';

const Radio: React.FC<IRadio> = ({
  name,
  value,
  label,
  onClick,
  isChecked,
}) => (
  <div className="radio-btn-wrapper">
    <input
      onClick={() => onClick({ value, name, label })}
      type="radio"
      id={value}
      name={name}
      value={value}
      checked={isChecked}
      readOnly
    />
    <label className="radio-btn-label" htmlFor={value}>
      <div>{label}</div>
    </label>
  </div>
);

export default Radio;
