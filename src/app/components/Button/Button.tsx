import IButton from './IButton';
import React from 'react';
import { cn } from '../../utils';

/**
 * Button is a React component that takes in children, size,
 * variant, and onClick props and returns a button element with the appropriate classes.
 * @param  - React.FC<IButton> - This is the type of the component.
 * It's a React component that takes a
 * generic type.
 */

const Button: React.FC<IButton> = ({
  id,
  children,
  size = 'md',
  block,
  variant = 'primary',
  onClick,
  className,
  position = 'relative',
  disabled = false,
  top,
  left,
  right,
  bottom,
  boxShadow,
  padding,
}) => {
  const styles:any = {
    top: `${top}px`,
    left: `${left}px`,
    right: `${right}px`,
    bottom: `${bottom}px`,
    boxShadow: boxShadow ? 'var(--default-box-shadow-darken2)' : '',
    padding: `${padding}px`,
  };

  return (
    <button
      id={id}
      type="button"
      onClick={!disabled ? onClick : null}
      style={{
        ...styles,
      }}
      className={cn({
        btn: true,
        [`btn-${variant}`]: true,
        [`btn-${size}`]: true,
        w100: block,
        'button-disabled': disabled,
        [`${className}`]: className,
        [`${position}`]: true,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
