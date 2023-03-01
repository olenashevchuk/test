import { Card, Text, Title } from '../../../../components';
import React, { useMemo } from 'react';

import Avatar from '../../../../components/Avatar';
import ITimeslotAdvancedView from './ITimeslotAdvancedView';
import { useWidget } from '../../../../contexts/Widget';

const TimeslotAdvancedView: React.FC<ITimeslotAdvancedView> = ({
  start,
  end,
  startStringDate,
  endStringDate,
  address,
  avatarUrl,
  name,
  clinic,
  clinician,
  treatmentId,
}) => {
  const { setCurrentScreen, setCurrentTimeslot } = useWidget();

  const handlingTimeslotClick = () => {
    const timeslotData = {
      startStringDate,
      endStringDate,
      start,
      end,
      avatarUrl,
      clinic,
      clinician,
      treatmentId,
    };
    setCurrentTimeslot?.(timeslotData);
    setCurrentScreen?.('AppointmentShow');
  };
  const timeslotPeriod = useMemo(() => `${start} - ${end}`, [start, end]);
  return (
    <Card cursor="pointer" shape="roundedsm" variant="selected" onClick={handlingTimeslotClick}>
      <div className="mb-sm">
        <Title size="h6">
          {timeslotPeriod}
        </Title>
        <Text size="body2">{address}</Text>
      </div>
      <div className="flex row align-center gap-large">
        <Avatar size="sm" src={avatarUrl} alt={name} />
        <Text size="body2">{name}</Text>
      </div>
    </Card>
  );
};

export default TimeslotAdvancedView;
