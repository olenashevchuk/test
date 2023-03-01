import {
  Button,
  Card,
  Text,
  Title,
} from '../../../../components';

import IBookingFailureSimpleView from './IBookingFailureSimpleView';
import React from 'react';
import { useWidget } from '../../../../contexts/Widget';

const failureMessages:any = {
  wrongSSN: '🦷 Feil SSN. Vennligst sjekk en gang til',
  busyTimeslot: '🦷 Denne tidsluken er opptatt!',
  allElseError: '🦷 Noe gikk galt. Prøv igjen senere eller ring oss',
};
const buttonText:any = {
  wrongSSN: '👉 Sjekke',
  busyTimeslot: '👉 Finn et annet tidspunkt',
  allElseError: '👉 Prøv igjen',
};

const BookingFailureSimpleView: React.FC<IBookingFailureSimpleView> = ({
  bookingFailure, setBookingFailure,
}) => {
  const { setCurrentScreen } = useWidget();
  const handleClick = () => {
    if (bookingFailure === 'wrongSSN') {
      setCurrentScreen?.('BookingWithSSN');
    } else if (bookingFailure === 'busyTimeslot') {
      setCurrentScreen?.('TimeslotsAll');
    } else {
      setCurrentScreen?.('TreatmentsAll');
    }
    setBookingFailure(null);
  };

  return (
    <div className="flex column w100 justify-center  align-center bg-primary gap-huge sucess">
      <Card gap="huge" variant="transparent" textCenter>
        <Title size="h1">{failureMessages[bookingFailure]}</Title>
        <Button onClick={handleClick}>
          <Text>{buttonText[bookingFailure]}</Text>
        </Button>
      </Card>
    </div>
  );
};

export default BookingFailureSimpleView;
