import { createContext } from 'react';

interface IWidgetContext {
  currentScreen?: string,
  setCurrentScreen?: (screen: string) => void,
  currentTreatment?:any,
  setCurrentTreatment?: any,
  currentClinic?: any,
  setCurrentClinic?: any,
  currentDate?: any,
  setCurrentDate?: any,
  currentTimeslot?: any,
  setCurrentTimeslot?: any,
}

const WidgetContext = createContext<IWidgetContext>({});

export default WidgetContext;
