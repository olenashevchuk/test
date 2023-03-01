import React, { useState } from 'react';

import ISwitch from './ISwitch';
import Text from '../Text';

const Switch: React.FC<ISwitch> = ({
  checked,
  label,
  onClick,
  addonPrice,
  _id,
  // addonName,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const onCheckedHandler = () => {
    setIsChecked(isChecked);
    return { addonPrice, label };
  };
  const onSwitch = (e:any): void => {
    e.stopPropagation();
    e.preventDefault();
    setIsChecked(!isChecked);
    onClick({ addonPrice, label, _id });
  };
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div className="flex row gap-medium align-center mr-xs" onClick={onSwitch} onKeyPress={handleKeyPress} role="button">
      <label htmlFor={label} role="status" className="switch">
        <input id={label} type="checkbox" checked={isChecked} onChange={onCheckedHandler} />
        <span className="slider round" />
      </label>
      <Text size="body2" className="pointer">{label}</Text>
    </div>
  );
};

export default Switch;
