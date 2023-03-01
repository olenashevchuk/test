import IDivider from './IDivider';
import React from 'react';
import Text from '../Text';
import { cn } from '../../utils';

const Divider: React.FC<IDivider> = ({ dividerWord, className }) => (
  <div
    className={cn({
      divider: true,
      [`${className}`]: className,
    })}
  >
    <Text className={dividerWord ? `${'divider-label fw-title'}` : ''}>{dividerWord || ''}</Text>
  </div>
);
export default Divider;
