import {
  BackButton,
  CloseButton,
  Spinner,
  Title,
} from '../../../components';
import { BookingAdvancedForm, BookingFailureSimpleView, BookingSuccessSimpleView } from '../../../domains/Booking/components';
import React, { useState } from 'react';

import { useCloseWidget } from '../../../utils';
import { useWidget } from '../../../contexts/Widget';

//! Template will be changed with styled inputs and other style fixes, added for testing logic
const BookingWithSSN: React.FC = () => {
  const { setCurrentScreen } = useWidget();

  const [isBookingFinished, setIsBookingFinished] = useState(false);
  const [bookingFailure, setBookingFailure] = useState(null);

  const [bookingLoading, setBookingLoading] = useState(false);
  const dispatchBookingLoading = (state:any) => {
    setBookingLoading(state);
  };
  const onSuccessFinishBooking = () => {
    setIsBookingFinished(true);
  };
  const onBookingFailure = (errorKey:any) => {
    setBookingFailure(errorKey);
  };

  const handleBackClick = () => {
    setCurrentScreen?.('BookingOtherMethods');
  };
  const handleClose = useCloseWidget;
  return (
    <div className="flex align-center column h100 justify-center">
      {/* By default show this block 1 */}
      {isBookingFinished && (
        <BookingSuccessSimpleView title="🦷 Avtalen ble bestilt! &#128522;" buttonText="👉 Lukk widget" />)}

      {bookingFailure && (
      <BookingFailureSimpleView
        bookingFailure={bookingFailure}
        setBookingFailure={setBookingFailure}
      />
      )}
      {!isBookingFinished && !bookingFailure
        && (
        <>
          <BackButton onClick={handleBackClick} />
          <CloseButton onClick={handleClose} />
          <div className="flex column w100 justify-center mt-xl mb-lg mx-lg align-center bg-primary gap-huge">
            <Title size="h1">Bestilling med SSN</Title>
          </div>

          <BookingAdvancedForm
            dispatchBookingLoading={dispatchBookingLoading}
            onSuccessFinishBooking={onSuccessFinishBooking}
            onBookingFailure={onBookingFailure}
          />
        </>
        )}

      {/* Next code is commentd to show how to use it will be removed on next merge */}
      {/* After press book button show spinner */}
      {bookingLoading
      && <Spinner spinnerShadow />}

      {/* After success show this BookingSuccessSimpleView */}

    </div>
  );
};
export default BookingWithSSN;
