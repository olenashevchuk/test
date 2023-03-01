import IAvatar from './IAvatar';
import React from 'react';
import { Text } from '../../components';
import { cn } from '../../utils';

const Avatar: React.FC<IAvatar> = ({
  src = '',
  alt = '',
  size = 'sm',
}) => {
  const nameString = alt?.split(' ');
  const nameShortCurt = nameString[0][0] + nameString[nameString.length - 1][0];
  return (
    src ? (
      <img src={src} alt={alt} className={cn({ avatar: true, [`avatar-${size}`]: true })} />
    ) : (
      <div
        className={cn({
          avatar: true,
          [`avatar-${size}`]: true,
          flex: true,
          'justify-center': true,
          'align-center': true,
          'br-large': true,
          'avatar-default-bg': true,
        })}
      >
        <Text>{nameShortCurt || '!'}</Text>
      </div>
    )
  );
};
export default Avatar;
