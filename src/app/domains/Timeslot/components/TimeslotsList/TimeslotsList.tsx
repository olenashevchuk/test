import {
  CalendarItem,
  Card,
  List,
  NoData,
  Spinner,
  Title,
} from '../../../../components';
import React, { useMemo } from 'react';

import { COLORS } from '../../../../constants';
import ITimeslotsList from './ITimeslotsList';
import TimeslotAdvancedView from '../TimeslotAdvancedView';
import { useTransformDate } from '../../../../utils';
import { useWidget } from '../../../../contexts/Widget';

const TimeslotsList: React.FC<ITimeslotsList> = ({
  timeslotsArray,
  timeslotsLoading,
  isNextBatchLoading,
}) => {
  const {
    getHoursAndMinutes, getDayName, getDate, getMonthName,
  } = useTransformDate();
  const { currentDate } = useWidget();

  const dayColor = useMemo(
    () => timeslotsArray.map((day: any, index: number) => COLORS[index % COLORS.length]),
    [timeslotsArray],
  );
  // Loading state
  if (timeslotsLoading) return (<List id="scrolled" gap="small"><Spinner /></List>);
  if (currentDate && !timeslotsArray[0]?.timeslots?.length) {
    return (
      <List id="scrolled" gap="small">
        <NoData>
          <Title size="h6">Ingen tilgjengelig tid denne dagen.</Title>
          <Title size="h6">Velg en annen dag </Title>
        </NoData>
      </List>
    );
  }
  // For rendering timeslots for next 30 days
  return (
    <>
      <List id="scrolled" className="relative mb-md">
        {!!timeslotsArray?.length && timeslotsArray.map(
          (timeslotsArrayItem, index: number) => (
            timeslotsArrayItem?.timeslots?.length ? (
              <Card
                key={timeslotsArrayItem?.date}
                variant="transparent"
                direction="row"
                gap="large"
                pb="0"
              >
                <>
                  {!currentDate && (
                  <CalendarItem
                    showedDay
                    bgc={dayColor[index]}
                    selected
                    size="lg"
                    tabIndex={0}
                    name={getDayName(timeslotsArrayItem?.date)}
                    number={getDate(timeslotsArrayItem?.date)}
                    monthName={getMonthName(timeslotsArrayItem?.date)}
                  />
                  )}

                  <div className="flex column w100 gap-medium">
                    {!!timeslotsArrayItem?.timeslots?.length
                    && timeslotsArrayItem?.timeslots?.map((timeslot) => (
                      <TimeslotAdvancedView
                        key={Math.random()}
                        start={getHoursAndMinutes(timeslot?.start)}
                        end={getHoursAndMinutes(timeslot?.end)}
                        address={timeslot?.clinic?.address1}
                        name={timeslot?.clinician?.name}
                        startStringDate={timeslot?.start}
                        endStringDate={timeslot?.end}
                        clinic={timeslot?.clinic}
                        clinician={timeslot?.clinician}
                        treatmentId={timeslot?.treatmentId}
                        avatarUrl={timeslot?.clinician?.avatarUrl}
                      />
                    ))}
                  </div>
                </>
              </Card>
            ) : null),
        )}
      </List>
      {isNextBatchLoading
      && (
      <div id="timeslots-batch-spin" className="mb-md flex justify-center align-center">
        <Spinner
          size={32}
          position="initial"
        />
      </div>
      )}
    </>
  );
};

export default TimeslotsList;
