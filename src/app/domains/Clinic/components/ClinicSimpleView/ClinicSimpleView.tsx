import IClinicSimpleView from './IClinicSimpleView';
import Radio from '../../../../components/Radio';
import React from 'react';
import { useWidget } from '../../../../contexts/Widget';

const ClinicSimpleView: React.FC<IClinicSimpleView> = ({
  name, value, label,
}) => {
  const { setCurrentClinic, currentClinic } = useWidget();

  const onClinicClick = (clinic:any) => {
    // Save clinic id to context, for fetching timeslots by selected clinic
    setCurrentClinic(clinic.value);
  };

  return (
    <Radio
      isChecked={currentClinic === value}
      onClick={onClinicClick}
      name={name}
      value={value}
      label={label}
    />
  );
};

export default ClinicSimpleView;
