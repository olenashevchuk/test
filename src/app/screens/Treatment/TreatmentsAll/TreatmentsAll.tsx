import React from 'react';
// import { useTransformDate } from '../../../utils';
import { Title } from '../../../components';
import TreatmentsList from '../../../domains/Treatment/components/TreatmentsList';

// import { useWidget } from '../../../contexts/Widget';

// import { Popover } from 'src/app/components';
// const getComputedBatchDate = (days: any) => {
//   const result = new Date();
//   result.setDate(result.getDate() + days);
//   return result;
// };
// const { getISOStringWithoutTimezone } = useTransformDate();
// const date = getComputedBatchDate(7 * 2);
// console.log(getISOStringWithoutTimezone(date, true));
const TreatmentsAll: React.FC = () => (
  <div className="flex align-center column space-between h100">
    <div className="flex column w100 justify-center mt-lg mb-lg mx-lg align-center bg-primary gap-huge">
      <Title size="h1">Velg behandling</Title>
    </div>
    <TreatmentsList />
  </div>
);
export default TreatmentsAll;
