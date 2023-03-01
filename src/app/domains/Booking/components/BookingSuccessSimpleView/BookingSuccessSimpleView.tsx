import {
  Button,
  Card,
  Text,
  Title,
} from '../../../../components';

import IBookingSuccessSimpleView from './IBookingSuccessSimpleView';
import React from 'react';
import { useCloseWidget } from '../../../../utils';

const BookingSuccessSimpleView: React.FC<IBookingSuccessSimpleView> = ({
  title, buttonText,
}) => {
  const handleClose = useCloseWidget;

  return (
    <div className="flex column w100 justify-center  align-center bg-primary gap-huge sucess">
      <Card gap="huge" variant="transparent" textCenter>
        <Title size="h1">{title}</Title>
        <Button onClick={handleClose}>
          <Text>{buttonText}</Text>
        </Button>
      </Card>
    </div>
  );
};

export default BookingSuccessSimpleView;
