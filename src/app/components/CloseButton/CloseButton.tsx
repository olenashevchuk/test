import Button from '../Button';
import ICloseButton from './ICloseButton';
import React from 'react';

const BackButton: React.FC<ICloseButton> = ({
  onClick,
  padding = '8',
}) => {
  const spanStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px',
  };
  return (
    <Button padding={padding} position="absolute" boxShadow variant="transparent" size="sm" top="10" right="10" onClick={onClick}>
      <span style={{ ...spanStyle }}>
        🗙
      </span>
    </Button>
  );
};

export default BackButton;
