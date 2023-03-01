import ITitle from './ITitle';
import React from 'react';
import { cn } from '../../utils';

const Title: React.FC<ITitle> = ({
  size = 'h1',
  color,
  children,
  id,
}) => React.createElement(size, {
  id,
  className: cn({
    [size]: true,
    [`c-${color}`]: true,
  }),
}, children);

export default Title;
