import IText from './IText';
import React from 'react';
import { cn } from '../../utils';

const Text: React.FC<IText> = ({
  size = 'body1',
  color,
  children,
  className,
}) => React.createElement('p', {
  className: cn({
    [size]: true,
    [`c-${color}`]: true,
    [`${className}`]: className,
  }),
}, children);

export default Text;
