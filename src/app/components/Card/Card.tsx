import ICard from './ICard';
import React from 'react';
import { cn } from '../../utils';

const Card: React.FC<ICard> = ({
  children,
  gap = 'default',
  variant = 'primary',
  shape = 'roundedmd',
  direction = 'column',
  cursor = 'default',
  onClick,
  paddingless,
  textCenter,
  pb
}) => {
  const styles:any = {
    paddingBottom: `${pb}px`,
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      style={...styles}
      className={cn({
        card: true,
        [`card-${shape}`]: true,
        [`card-${variant}`]: true,
        [`card-direction-${direction}`]: true,
        [`card-gap-${gap}`]: true,
        [`card-cursor-${cursor}`]: true,
        [paddingless ? 'p-reset' : '']: true,
        [textCenter ? 't-center' : '']: true,

      })}
    >
      {children}
    </div>
  );
};

export default Card;
