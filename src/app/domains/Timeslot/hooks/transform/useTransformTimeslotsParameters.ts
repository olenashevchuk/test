import { DEFAULT_SELECTED_CLINIC } from '../../../../domains/Clinic/__constants__';
import { useMemo } from 'react';
import { useTransformDate } from '../../../../utils';
import { useWidget } from '../../../../contexts/Widget';

const DELAY_BETWEEN_START_FETCH_DATES = 7;

const useTransformTimeslotsParameters = () => {
  const { currentClinic, currentDate } = useWidget();
  const { getISOStringWithoutTimezone, getDateWithDelay } = useTransformDate();

  // calculate clinic fetch parameter
  // if selected clinic exist - add parameter to fetch, else - fetch all clinics
  const clinicFetchParameter = useMemo(() => (
    currentClinic && currentClinic !== DEFAULT_SELECTED_CLINIC ? `&clinicId=${currentClinic}` : ''
  ), [currentClinic]);

  // when user select date - pass appropriate date to fetch parameters
  // I use such strange string templates because
  // for fetching timeslots by date we should use '/timeslots/opus?'
  // and for next 30 days we use just '/timeslots?'
  const computedDateFetchParameters = useMemo(() => {
    // const currentDateFormatted = getISOStringWithoutTimezone(currentDate?.date);
    const [currentDateISOString] = currentDate?.date ? currentDate.date.toISOString().split('T') : '';

    const _computedDateFetchParameters = currentDateISOString
      ? `date=${currentDateISOString}&duration=1` : '';
    return _computedDateFetchParameters;
  }, [currentDate]);

  // concat all parameters to one string for passing to fetch function
  const combinedFetchParameters = useMemo(
    () => `${computedDateFetchParameters}${clinicFetchParameter}`,
    [computedDateFetchParameters, clinicFetchParameter],
  );

  // Array of dates for fetching timeslots batches
  const timeslotsFetchDates = useMemo(() => {
    // Current date without timezone and without time
    const firstBatchDate = getISOStringWithoutTimezone(new Date(), true);

    // Calculate 3 startFrom fetch dates with delay 7 days between them
    const restBatchesDates = [1, 2, 3].map(
      (multiplier) => getISOStringWithoutTimezone(
        getDateWithDelay(DELAY_BETWEEN_START_FETCH_DATES * multiplier),
        true,
      ),
    );
    return [firstBatchDate, ...restBatchesDates];
  }, []);

  return { timeslotsFetchDates, combinedFetchParameters };
};

export default useTransformTimeslotsParameters;
