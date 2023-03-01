import { useMemo, useState } from 'react';

import { PENDING_STATUS } from '../../../__constants__/bookingStatuses';
import { createBooking } from '../../../helpers';
import { decomposePersonalNumber } from '../../../../../utils';
import useGetInitialDataFromInDB from './useGetInitialDataFromInDB';
import { useWidget } from '../../../../../contexts/Widget';

const ONLY_NUMBERS_REG_EXP = /^\d+$/;
const SPACES_REG_EXP = /\s+/g;
// eslint-disable-next-line no-useless-escape
const EMAIL_REG_EXP = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;

const NORWEGIAN_POSTAL_CODE_LENGTH = 4;
const NORWEGIAN_PERSONAL_NUMBER_LENGTH = 11;

const useBookingAdvancedFormActions = (
  dispatchBookingLoading:any,
  onSuccessFinishBooking:any,
  onBookingFailure:any,
) => {
  const { currentTimeslot, currentTreatment } = useWidget();
  // STATE
  const [clientFirstName, setClientFirstName] = useState<any>('');
  const [clientLastName, setClientLastName] = useState<any>('');
  const [clientPhone, setClientPhone] = useState<any>('');
  const [clientPostalCode, setClientPostalCode] = useState<any>('');
  const [clientEmail, setClientEmail] = useState<any>('');
  const [clientPersonalNumber, setClientPersonalNumber] = useState<any>('');

  useGetInitialDataFromInDB({
    setClientFirstName,
    setClientLastName,
    setClientPhone,
    setClientPostalCode,
    setClientEmail,
    setClientPersonalNumber,
  });

  // STATE MANAGEMENT FUNCTIONS
  const handlePhoneChange = (phone:any) => {
    // Prevent to many set states when try to enter non digits characters
    if (phone !== clientPhone) setClientPhone(phone);
  };
  const handleFirstNameChange = ({ target }: any) => {
    const firstName = target.value.trim() ? target.value : target.value.trim();
    if (firstName !== clientFirstName) setClientFirstName(firstName);
  };
  const handleLastNameChange = ({ target }: any) => {
    const lastName = target.value.trim() ? target.value : target.value.trim();
    if (lastName !== clientLastName) setClientLastName(target.value);
  };
  const handlePostalCodeChange = ({ target }: any) => {
    // Remove all spaces
    const postalCode = target.value.replace(SPACES_REG_EXP, '');
    // Validate string, should be just digits,
    // check if value not same as previous, to prevent redundant state updates
    // Check for length, should be 4 digits, norway standard
    const isPassedValidation = ONLY_NUMBERS_REG_EXP.test(postalCode)
     && postalCode?.length <= NORWEGIAN_POSTAL_CODE_LENGTH
      && postalCode !== clientPostalCode;

    // first part of condition to pass full clearing of input value
    if (!postalCode || isPassedValidation) {
      setClientPostalCode(postalCode);
    }
  };
  const handleEmailChange = ({ target }: any) => {
    // Remove all spaces
    const email = target.value.replace(SPACES_REG_EXP, '');
    // validate with email regex and check if value not as previous
    if (email !== clientEmail) {
      setClientEmail(email);
    }
  };
  const handlePersonalNumberChange = ({ target }: any) => {
    // Remove all spaces
    const personalNumberString = target.value?.replace(SPACES_REG_EXP, '');
    // Value should contain only digits, and check if not same as previous value
    const isPassedValidation = ONLY_NUMBERS_REG_EXP.test(personalNumberString)
      && personalNumberString !== clientPersonalNumber
      && personalNumberString?.length <= NORWEGIAN_PERSONAL_NUMBER_LENGTH;

    if (!personalNumberString || isPassedValidation) {
      setClientPersonalNumber(personalNumberString);
    }
  };
  // For disabling submit booking button until correct data will be passed
  const isBookingAvailable = useMemo(
    () => (currentTimeslot?.startStringDate
      && typeof currentTreatment?.price === 'number'
      && clientFirstName
      && clientLastName
      && EMAIL_REG_EXP.test(clientEmail)
      && clientPhone
      && clientPostalCode?.length === NORWEGIAN_POSTAL_CODE_LENGTH
      && clientPersonalNumber?.length === NORWEGIAN_PERSONAL_NUMBER_LENGTH),
    [currentTimeslot,
      currentTreatment,
      clientFirstName,
      clientLastName,
      clientPostalCode,
      clientEmail,
      clientPhone,
      clientPersonalNumber],
  );

  // Convert array of selected addons objects to array of addons ids
  const arrayOfSelectedTreatmentAddonsIds = useMemo(() => (currentTreatment?.selectedAddons?.length
    ? currentTreatment?.selectedAddons?.map((addon:any) => addon?._id) : []), [currentTreatment]);

  // POST BOOKING
  const handleCreateBooking = async () => {
    dispatchBookingLoading?.(true);
    const {
      day, month, year, extraDigits,
    }:any = decomposePersonalNumber(clientPersonalNumber);

    // Create booking data object with all fields required for booking
    const pendingBookingData = {
      price: currentTreatment?.price,
      status: PENDING_STATUS,
      patient: {
        firstName: clientFirstName,
        lastName: clientLastName,
        postalCode: clientPostalCode,
        email: clientEmail,
        phone: `+${clientPhone}`,
        personalNumber: {
          day,
          month,
          year,
          extraDigits,
        },
      },
      timeslot: {
        start: currentTimeslot?.startStringDate,
        end: currentTimeslot?.endStringDate,
        clinicId: currentTimeslot?.clinic?._id,
        clinicianId: currentTimeslot?.clinician?._id,
        treatmentId: +currentTimeslot.treatmentId,
        addons: arrayOfSelectedTreatmentAddonsIds,
      },
    };
    // Save booking to firestore using our API
    await createBooking({ pendingBookingData, onSuccessFinishBooking, onBookingFailure });

    dispatchBookingLoading?.(false);
  };

  return {
    isBookingAvailable,
    clientPhone,
    clientFirstName,
    clientLastName,
    clientPostalCode,
    clientEmail,
    clientPersonalNumber,
    handlePhoneChange,
    handleFirstNameChange,
    handleLastNameChange,
    handlePostalCodeChange,
    handleEmailChange,
    handlePersonalNumberChange,
    handleCreateBooking,
  };
};

export default useBookingAdvancedFormActions;
