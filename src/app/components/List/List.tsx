import IList from './IList';
import React from 'react';
import { cn } from '../../utils';

const List : React.FC<IList> = ({
  children,
  id,
  direction = 'column',
  gap = 'default',
  shape = 'squared',
  className,

}) => (
  <div
    id={id}
    className={cn({
      list: true,
      [`list-${direction}`]: true,
      [`list-gap-${gap}`]: true,
      [`card-${shape}`]: true,
      [`${className}`]: className,
    })}
  >
    {children}
  </div>
);

export default List;
