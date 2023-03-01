import BOOKING_FAILURE_TYPES, { ALL_ELSE_ERROR_FAILURE_TYPE } from '../__constants__/bookingFailureTypes';
import { BUSY_TIMESLOT_FAILURE_MESSAGE, WRONG_SSN_FAILURE_MESSAGE } from '../__constants__/bookingFailureMessages';

import { FAILED_STATUS } from '../__constants__/bookingStatuses';
import { PROD_API_URL } from '../../../constants/apiURLs';

interface ICreateBooking {
    pendingBookingData: object;
    onSuccessFinishBooking?: () => void;
    onBookingFailure: (failureType: string) => void;
}

const createBooking = async (bookingProperties: ICreateBooking) => {
  const { pendingBookingData, onSuccessFinishBooking, onBookingFailure } = bookingProperties;

  try {
    // Make a booking request to the DENT IN BACKEND API
    const bookingResponse = await fetch(`${PROD_API_URL}/bookings`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pendingBookingData),
    });
    const bookingResponseData = await bookingResponse.json();

    // Check if the booking was successful
    const isSuccessBooking = !bookingResponseData?.data?.booking?.errorMessage
      && bookingResponseData?.data?.booking?.status !== FAILED_STATUS
      && !!bookingResponseData?.data?.booking?._id;

    // If booking was unsuccessful, check which failure was triggered
    const isWrongSSN = bookingResponseData?.data?.booking?.errorMessage
      ?.includes(WRONG_SSN_FAILURE_MESSAGE);
    const isBusyTimeslot = bookingResponseData?.message === BUSY_TIMESLOT_FAILURE_MESSAGE;
    const isOtherError = !isSuccessBooking && !isWrongSSN && !isBusyTimeslot;

    if (isSuccessBooking) {
      onSuccessFinishBooking?.();
    }
    // If booking was not successful
    // map by boolean failures to pass failure type to onBookingFailure
    [isWrongSSN, isBusyTimeslot, isOtherError].forEach((isFailure: boolean, index) => {
      if (isFailure) {
        onBookingFailure(BOOKING_FAILURE_TYPES[index]);
      }
    });
    return bookingResponseData;
  } catch (error:any) {
    onBookingFailure(ALL_ELSE_ERROR_FAILURE_TYPE);
    console.error('Error occurred during booking process. ', error?.message);
    return null;
  }
};

export default createBooking;
