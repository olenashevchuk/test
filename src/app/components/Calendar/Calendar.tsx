import { getDateRange, useHorizontalScroll } from '../../utils';

import CalendarItem from '../CalendarItem';
import ICalendar from './ICalendar';
import React from 'react';
import { useWidget } from '../../contexts/Widget';

const Calendar: React.FC<ICalendar> = ({ checkIsCalendarItemDisabled }) => {
  // Additional hooks
  const { currentDate, setCurrentDate } = useWidget();

  // Custom methods
  const days:any[] = getDateRange(30);

  // Methods
  const selectDay = ({ day, month, date }:any) => {
    const isDateSecondPress = currentDate?.day === day
      && currentDate?.month === month;
    const computedSelectedDayValue = isDateSecondPress ? null : {
      day,
      month,
      date,
    };

    // Save current selected date value to context
    setCurrentDate(computedSelectedDayValue);
  };

  useHorizontalScroll('#calendar-horizontal-scroll-list');
  return (
    <div className="calendar" id="calendar-horizontal-scroll-list">
      {days.map((day:any, index) => (
        <CalendarItem
          disabled={checkIsCalendarItemDisabled(index)}
          key={`${day?.weekday}-${day?.day}`}
          name={day?.weekday}
          number={day?.day}
          monthName={day?.monthName}
          size="sm"
          tabIndex={0}
          onClick={() => selectDay(day)}
          selected={currentDate?.day === day.day && currentDate?.month === day.month}
        />
      ))}
    </div>
  );
};

export default Calendar;
