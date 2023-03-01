import INoData from './INoData';
import React from 'react';
import Title from '../Title';
import { cn } from '../../utils';

const NoData: React.FC<INoData> = ({
  children,
  gap = 'default',
  variant = 'primary',
  shape = 'roundedmd',
  direction = 'column',
  cursor = 'default',
}) => (
  <div
      // onClick={onClick}
      // onKeyPress={handleKeyPress}
    tabIndex={0}
    role="button"
    className={cn({
      card: true,
      'card-no-data': true,
      [`card-${shape}`]: true,
      [`card-${variant}`]: true,
      [`card-direction-${direction}`]: true,
      [`card-gap-${gap}`]: true,
      [`card-cursor-${cursor}`]: true,

    })}
  >
    {children}
  </div>
);

export default NoData;
