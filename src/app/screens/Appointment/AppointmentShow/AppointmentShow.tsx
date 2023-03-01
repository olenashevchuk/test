import {
  BackButton,
  CloseButton,
  Spinner,
  Title,
} from '../../../components';
import React, { useMemo, useState } from 'react';
import { useCloseWidget, useTransformDate } from '../../../utils';

import AppointmentAdvancedView from '../../../domains/Appointment/components/AppointmentAdvancedView';
import { BookingFailureSimpleView } from '../../../domains/Booking/components';
import { useWidget } from '../../../contexts/Widget';

const AppointmentShow: React.FC = () => {
  const { currentTimeslot, setCurrentScreen } = useWidget();
  const { getDayName, getDate, getMonthName } = useTransformDate();

  const [vippsLoading, setVippsLoading] = useState(false);
  const [vippsBookingFailure, setVippsBookingFailure] = useState(null);

  const weekDay = useMemo(() => getDayName(currentTimeslot?.startStringDate), [currentTimeslot]);
  const date = useMemo(() => getDate(currentTimeslot?.startStringDate), [currentTimeslot]);
  const monthName = useMemo(
    () => getMonthName(currentTimeslot?.startStringDate),
    [currentTimeslot],
  );
  const handleBackClick = () => {
    setCurrentScreen?.('TimeslotsAll');
  };
  const handleClose = useCloseWidget;

  return (
    <div className="flex align-center column space-between h100">
      {/* LOADING STATE */}
      {vippsLoading && <Spinner /> }

      {/* BOOKING ERROR STATE */}
      {vippsBookingFailure && (
        <div className="flex h100 justify-center">
          <BookingFailureSimpleView
            bookingFailure={vippsBookingFailure}
            setBookingFailure={setVippsBookingFailure}
          />
        </div>
      )}

      {/* APPOINTMENT VIEW */}
      {!vippsLoading && !vippsBookingFailure && (
        <>
          <BackButton onClick={handleBackClick} />
          <CloseButton onClick={handleClose} />
          <div className="flex column w100 justify-center mx-lg align-center mt-xl bg-primary gap-huge">
            <Title size="h1">Bekreft time</Title>
            {/* Temporarily commented */}
            {/* <Text className="px-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text> */}
          </div>

          <AppointmentAdvancedView
            day={weekDay}
            date={date}
            monthName={monthName}
            start={currentTimeslot?.start}
            end={currentTimeslot?.end}
            address={currentTimeslot?.clinic?.address1}
            clinicianAvatar={currentTimeslot?.clinician?.avatarUrl}
            clinicianName={currentTimeslot?.clinician?.name}
            setVippsLoading={setVippsLoading}
            setVippsBookingFailure={setVippsBookingFailure}
          />
        </>
      )}

    </div>
  );
};

export default AppointmentShow;
