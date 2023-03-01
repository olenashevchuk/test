import {
  List,
  Skeleton,
  Title,
} from '../../../../components';

import ClinicSimpleView from '../ClinicSimpleView';
import { DEFAULT_SELECTED_CLINIC } from '../../__constants__';
import IClinicsList from './IClinicsList';
import React from 'react';
import { useGetClinics } from '../../hooks/get';
import { useHorizontalScroll } from '../../../../utils';

const ClinicsList: React.FC<IClinicsList> = () => {
  const [clinics, loading] = useGetClinics();

  useHorizontalScroll('#horizontal-scroll-list');
  // if clinic has no adress - show location region instead
  const clinicAdressOrName = (item: any) => {
    if (item?.address1?.length === 0) { return item?.name.split('avd')[1]; }
    return item?.address1;
  };
  return (
    <div className="flex column gap-default mb-lg mt-lg transition-speed-default" id="clinic-list-wrapper">
      <div className="mx-sm">
        <Title id="clinic-list-name" size="h6">Klinik</Title>
      </div>
      <List gap="medium" direction="row" id="horizontal-scroll-list">
        {loading ? <Skeleton value="lasting..." /> : (
          <>
            <ClinicSimpleView
              name="selectClinic"
              value={DEFAULT_SELECTED_CLINIC}
              label={DEFAULT_SELECTED_CLINIC}
            />
            {!!clinics.length && clinics?.map((item:any) => (
              <ClinicSimpleView
                key={item._id}
                name="selectClinic"
                value={item._id}
                label={clinicAdressOrName(item)}
              />
            ))}
          </>
        )}

      </List>
    </div>
  );
};
export default ClinicsList;
