import React, { useMemo, useState } from 'react';
import { DEFAULT_SELECTED_CLINIC } from '../../domains/Clinic/__constants__';

import IWidgetProvider from './IWidgetProvider';
import WidgetContext from './WidgetContext';

const WidgetProvider: React.FC<IWidgetProvider> = ({ children, initialScreen }) => {
  const [currentScreen, setCurrentScreen] = useState<string>(initialScreen);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  // set default value as All clinics to show as default checked
  const [currentClinic, setCurrentClinic] = useState<string>(DEFAULT_SELECTED_CLINIC);
  const [currentDate, setCurrentDate] = useState();
  const [currentTimeslot, setCurrentTimeslot] = useState<any>();

  const value = useMemo(() => ({
    currentScreen,
    setCurrentScreen,
    currentTreatment,
    setCurrentTreatment,
    currentClinic,
    setCurrentClinic,
    currentDate,
    setCurrentDate,
    currentTimeslot,
    setCurrentTimeslot,
  }), [
    currentScreen,
    setCurrentScreen,
    currentTreatment,
    setCurrentTreatment,
    currentClinic,
    setCurrentClinic,
    currentDate,
    setCurrentDate,
    currentTimeslot,
    setCurrentTimeslot,
  ]);

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  );
};

export default WidgetProvider;
