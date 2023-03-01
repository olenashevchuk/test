import ISkeleton from './ISkeleton';
import React from 'react';

const Skeleton: React.FC<ISkeleton> = ({
  value,
}) => (
  <div className="radio-btn-wrapper radio-is-loading">
    <input
      type="radio"
      value={value}
      checked={false}
      readOnly
    />
    <label className="radio-btn-label" htmlFor={value}>
      <div>{value}</div>
    </label>
  </div>
);
export default Skeleton;
