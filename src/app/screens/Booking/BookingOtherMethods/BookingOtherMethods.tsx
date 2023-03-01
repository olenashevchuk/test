import {
  BackButton,
  Button,
  CloseButton,
  Divider,
  Text,
  Title,
} from '../../../components';

import React from 'react';
import { useCloseWidget } from '../../../utils';
import { useWidget } from '../../../contexts/Widget';

// !REPLACE TO REAL PHONE NUMBER
const CLINIC_PHONE_NUMBER = '+48 883 616 937';

const BookingOtherMethods: React.FC = () => {
  const { setCurrentScreen } = useWidget();

  const handleCall = () => {
    window.location.href = new URL(`tel:${CLINIC_PHONE_NUMBER}`).toString();
  };
  const handleBackClick = () => {
    setCurrentScreen?.('AppointmentShow');
  };
  const handleClose = useCloseWidget;

  const goToSSNBooking = () => {
    setCurrentScreen?.('BookingWithSSN');
  };

  //! TEMPORARY TEMPLATE SASHA WILL FIX STYLES AND TEXT
  return (
    <div className="flex align-center column h100">
      <BackButton onClick={handleBackClick} />
      <CloseButton onClick={handleClose} />
      <div className="flex column w100 justify-center mt-xl mb-xl mx-lg align-center bg-primary gap-huge">
        <Title size="h1">Bestillingsmetoder</Title>
        <Text className="px-md t-center">
          Du kan bestille time med de neste metodene
        </Text>
      </div>

      <div className="card card-transparent flex w100 h100 gap-medium">
        <Button block onClick={goToSSNBooking}>Bestilling med SSN</Button>

        <Divider dividerWord="Eller" />
        <Button variant="secondary" block onClick={handleCall}>
          Ring oss
        </Button>
      </div>
    </div>
  );
};

export default BookingOtherMethods;
