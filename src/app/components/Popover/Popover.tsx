import IPopover from './IPopover';
import React from 'react';
import { cn } from '../../utils';

const Popover: React.FC<IPopover> = ({ children, height }) => (
  <div
    style={{ maxHeight: height, height }}
    className={cn({
      card: true,
      'absolute-bottom w100 br-default': true,
    })}
  >
    {children}
  </div>
);

export default Popover;
