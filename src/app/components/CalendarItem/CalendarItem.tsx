import React, { useMemo } from 'react';
import { Text, Title } from '../index';

import ICalendarItem from './ICalendarItem';
import { cn } from '../../utils';

const CalendarItem: React.FC<ICalendarItem> = ({
  name,
  monthName,
  showedDay,
  number,
  bgc = '',
  size = 'sm',
  selected = false,
  disabled = false,
  cursor = 'pointer',
  tabIndex,
  onClick,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  const monthShortName = monthName.charAt(0).toUpperCase() + monthName.substring(1, 3);
  const dateName = name.charAt(0).toUpperCase() + name.substring(1, 3);

  return (
    <div
      style={{ backgroundColor: `${bgc}` }}
      role="button"
      tabIndex={tabIndex}
      onClick={!disabled ? onClick : null}
      onKeyPress={handleKeyPress}
      className={cn({
        'calendar-item': true,
        [`calendar-item-${size}`]: true,
        'calendar-item-selected': selected,
        'calendar-item-disabled': disabled,
        [`calendar-item-cursor-${cursor}`]: true,
        'br-small': true,
      })}
    >
      {showedDay ? (
        <>
          <Text color="primary" size="caption2">
            {monthShortName}
          </Text>
          <Title color="primary" size="h4">{number.toString()}</Title>
          <Text color="primary" className="ff-title" size="caption2">{name}</Text>
        </>
      ) : (
        <>
          <Text size="caption2">
            {monthShortName}
          </Text>
          <Title size="h6">{number.toString()}</Title>
          <Text size="caption2">
            {dateName}
          </Text>

        </>
      )}

    </div>
  );
};

export default CalendarItem;
