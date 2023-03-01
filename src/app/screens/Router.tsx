import { AppointmentShow } from './Appointment';
import { BookingWithSSN, BookingOtherMethods } from './Booking';
import React from 'react';
// import { Screens } from '../enums';
import TimeslotsAll from './Timeslot/TimeslotsAll';
import TreatmentsAll from './Treatment/TreatmentsAll';
import { useWidget } from '../contexts/Widget';

const Router = () => {
  const { currentScreen } = useWidget();

  switch (currentScreen) {
    case 'AppointmentShow':
      return <AppointmentShow />;
    case 'BookingWithSSN':
      return <BookingWithSSN />;
    case 'BookingOtherMethods':
      return <BookingOtherMethods />;
    case 'TimeslotsAll':
      return <TimeslotsAll />;
    case 'TreatmentsAll':
      return <TreatmentsAll />;
    default:
      return <TreatmentsAll />;
  }
};

export default Router;
