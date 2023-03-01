import ISpinner from './ISpinner';
import React from 'react';
import { cn } from '../../utils';

const Spinner: React.FC<ISpinner> = ({
  position = 'absolute',
  zIndex = '1',
  spinnerShadow,
  size,
}) => (
  <>
    {spinnerShadow
    && <div className="spinnerShadow" />}
    <div
      style={{ zIndex, height: size, width: size }}
      className={cn({
        loader: true,
        [position]: true,
      })}
    >

      <div className="inner one" />
      <div className="inner two" />
      <div className="inner three" />

    </div>
  </>
);

export default Spinner;
