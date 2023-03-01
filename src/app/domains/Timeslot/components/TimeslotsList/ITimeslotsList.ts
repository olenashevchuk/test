import { timeslotsArrayItemType } from '../../interfaces/timeslotsVariablesTypes';

interface ITimeslotsList {
  timeslotsArray: timeslotsArrayItemType[];
  timeslotsLoading: boolean;
  isNextBatchLoading: boolean;
}

export default ITimeslotsList;
