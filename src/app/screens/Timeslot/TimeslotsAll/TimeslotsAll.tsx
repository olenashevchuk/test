import {
  BackButton,
  Calendar,
  CloseButton,
  Title,
} from '../../../components';
import React, { useEffect } from 'react';

import ClinicsList from '../../../domains/Clinic/components/ClinicsList';
import TimeslotsList from '../../../domains/Timeslot/components/TimeslotsList';
import { useCloseWidget } from '../../../utils';
import { useGetTimeslots } from '../../../domains/Timeslot/hooks/get';
import useTrackScroll from './hooks/useTrackScroll';
import { useWidget } from '../../../contexts/Widget';

const TimeslotsAll: React.FC = () => {
  const {
    timeslotsArray,
    calendarTimeslots,
    timeslotsLoading,
    isNextBatchLoading,
    getTimeslotsNextBatch,
  } = useGetTimeslots();
  const { setCurrentScreen, currentDate, setCurrentDate } = useWidget();

  useTrackScroll({ getTimeslotsNextBatch });

  const checkIsCalendarItemDisabled = (
    index: number,
  ): boolean => !calendarTimeslots[index]?.timeslots?.length;
  const handleBackClick = () => {
    setCurrentScreen?.('TreatmentsAll');
  };
  const handleClose = useCloseWidget;

  useEffect(() => {
    if (currentDate) setCurrentDate(null);
  }, []);

  return (
    <div className="flex column h100">
      <BackButton padding="8" onClick={handleBackClick} />

      <CloseButton padding="8" onClick={handleClose} />

      <div id="top-layer-wrapper" className="flex w100 justify-center mx-md  mt-xl bg-primary">
        <Title>Velg tig</Title>
      </div>
      <div>
        <ClinicsList />
      </div>
      <div className="pb-sm box-shadow-bottom-darken1-2">
        <div className="mx-md">
          <Title size="h6">Dato</Title>
        </div>
        <Calendar checkIsCalendarItemDisabled={checkIsCalendarItemDisabled} />
      </div>
      <TimeslotsList
        timeslotsArray={timeslotsArray}
        timeslotsLoading={timeslotsLoading}
        isNextBatchLoading={isNextBatchLoading}
      />
    </div>
  );
};

export default TimeslotsAll;
