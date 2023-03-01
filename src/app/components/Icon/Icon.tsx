import IIcon from './IIcon';
import React from 'react';

const Icon: React.FC<IIcon> = ({
  icon,
}) => (
  <i className={icon} />
);

export default Icon;
