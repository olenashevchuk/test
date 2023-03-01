import { List, Spinner } from '../../../../components';
import React, { useMemo, useState } from 'react';

import ITreatmentsList from './ITreatmentsList';
import TreatmentAdvancedView from '../TreatmentAdvancedView';
import { useGetTreatments } from '../../hooks/get';

const TreatmentsList: React.FC<ITreatmentsList> = () => {
  const [treatments, loading] = useGetTreatments();
  const [selectedItem, setSelectedItem] = useState('');

  const sortedTreatments = useMemo(
    () => (treatments?.length ? treatments?.sort(
      (a:any, b:any) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    ) : []),
    [treatments],
  );
  return loading ? <Spinner /> : (
    <div
      className="card card-popover br-default over-y-scroll"
    >
      <List shape="roundedmd" gap="large">
        {!!sortedTreatments?.length && sortedTreatments?.map((item) => (
          <TreatmentAdvancedView
            key={item?._id}
            id={item._id}
            name={item.name}
            description={item.description}
            extraInfo=""
            addons={item?.addons}
            price={item.price}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )) }
      </List>
    </div>
  );
};

export default TreatmentsList;
