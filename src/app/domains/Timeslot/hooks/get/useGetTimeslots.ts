import {
  timeslotsArrayItemType,
  timeslotsFetchPromiseSettledResult,
  timeslotsFetchingResult,
} from '../../interfaces/timeslotsVariablesTypes';
import { useCallback, useEffect, useState } from 'react';

import { PROD_API_URL } from '../../../../constants/apiURLs';
import { getErrorMessage } from '../../../../utils';
import { useTransformTimeslotsParameters } from '../transform';
import { useWidget } from '../../../../contexts/Widget';

// First batch fetch automatically when component is mounted
// Next batches starts from second batch date till the end of array timeslotsFetchDates
const START_COUNTER = 1;

const useGetTimeslots = ():timeslotsFetchingResult => {
  const { timeslotsFetchDates, combinedFetchParameters } = useTransformTimeslotsParameters();
  const { currentTreatment, currentDate } = useWidget();

  const [timeslotsArray, setTimeslots] = useState<timeslotsArrayItemType[]>([]);
  const [calendarTimeslots, setCalendarTimeslots] = useState<timeslotsArrayItemType[]>([]);
  const [timeslotsLoading, setTimeslotsLoading] = useState<boolean>(false);
  const [calendarTimeslotsLoading, setCalendarTimeslotsLoading] = useState<boolean>(false);
  const [timeslotsError, setTimeslotsError] = useState<string>('');
  const [calendarTimeslotsError, setCalendarTimeslotsError] = useState<string>('');

  // State for displaying spinner at the end of timeslots list
  // when next timeslots batch is loading
  const [isNextBatchLoading, setIsNextBatchLoading] = useState<boolean>(false);

  // Used for fetching next batch of timeslots by dates array
  // also prevent useless fetching of timeslots
  const [timeslotsFetchCounter, setTimeslotsFetchCounter] = useState<number>(START_COUNTER);

  // When user scroll to down, fetch more timeslots and append to the end of the list
  const getTimeslotsNextBatch = useCallback(async () => {
    // Prevent fetching of timeslots when there is no next batch
    // When current date selected there is no need to fetch next batch for other days
    if (timeslotsFetchCounter < timeslotsFetchDates.length && !currentDate) {
      setIsNextBatchLoading(true);
      const timeslotsExtendedFetchUrl = `${PROD_API_URL}/timeslots/treatments/${currentTreatment?._id}`;
      // Compute date parameter for fetching next batch
      // by getting date from array that contain startFromFetchDate by counter
      const computedDateParameter = `date=${timeslotsFetchDates[timeslotsFetchCounter]}`;

      // Merge all needed parameters to fetch timeslots with selected filters (like clinic)
      const timeslotsFetchUrlForSelectedDate = `${timeslotsExtendedFetchUrl}?${computedDateParameter}${combinedFetchParameters}`;
      try {
        // Try to fetch timeslots and parse response
        const { data } = await (await fetch(timeslotsFetchUrlForSelectedDate)).json();
        // Append fetched timeslots to the end of the list
        setTimeslots((prevTimeslots) => [...prevTimeslots, ...data.timeslots]);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setTimeslotsError(errorMessage);
      }
      // Increase timeslotsFetchCounter for next batch
      setTimeslotsFetchCounter((prevTimeslotsFetchCounter) => prevTimeslotsFetchCounter + 1);
      setIsNextBatchLoading(false);
    }
  }, [
    timeslotsFetchCounter,
    timeslotsFetchDates,
    combinedFetchParameters,
    currentTreatment,
    currentDate,
  ]);

  // Fetch timeslots with all additional data to display in TimeslotsList
  useEffect(() => {
    const fetchTimeslots = async () => {
      setTimeslotsLoading(true);
      const timeslotsExtendedFetchUrl = `${PROD_API_URL}/timeslots/treatments/${currentTreatment?._id}`;
      // When current date already selected date parameter already in combined fetch parameters
      // in another case fetch 7 days from current date for first batch of timeslots
      const computedDateParameter = currentDate ? '' : `date=${timeslotsFetchDates[0]}`;

      // Merge all needed parameters to fetch timeslots with selected filters
      const timeslotsFetchUrlForSelectedDate = `${timeslotsExtendedFetchUrl}?${computedDateParameter}${combinedFetchParameters}`;
      try {
        const { data } = await (await fetch(timeslotsFetchUrlForSelectedDate)).json();

        setTimeslots(data?.timeslots);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setTimeslotsError(errorMessage);
      }
      setTimeslotsLoading(false);
    };
    fetchTimeslots();
  }, [
    timeslotsFetchDates,
    combinedFetchParameters,
    currentTreatment,
    currentDate,
  ]);

  // Light timeslots fetch without information about clinician, clinic and treatment
  // this timeslots only for disabled state of calendar days
  useEffect(() => {
    const fetchTimeslotsWithoutAdditionalData = async () => {
      setCalendarTimeslotsLoading(true);
      const timeslotsWithoutAdditionalDataFetchUrl = `${PROD_API_URL}/timeslots/treatments/${currentTreatment?._id}/light`;

      try {
        // Map by fetch dates and create timeslots promises array
        const timeslotsWithoutAdditionalDataFetchPromises = timeslotsFetchDates.map((date) => fetch(
          `${timeslotsWithoutAdditionalDataFetchUrl}?date=${date}${combinedFetchParameters}`,
        ));
        // Wait for all promises to be resolved
        const timeslotsResponses = await Promise.allSettled(
          timeslotsWithoutAdditionalDataFetchPromises,
        );

        // Map by resolved promises and parse response
        const timeslotsWithoutAdditionalDataResponses = await Promise.allSettled(
          timeslotsResponses.map((response) => response.status === 'fulfilled' && response.value.json())
            .filter(Boolean),
        );
        // Merge array of resolved promises objects to array of timeslots objects
        const timeslotsData:timeslotsArrayItemType[] = timeslotsWithoutAdditionalDataResponses
          .reduce(
            (
              previousResponsesData:timeslotsArrayItemType[],
              currentResponse:PromiseSettledResult<timeslotsFetchPromiseSettledResult>,
            ) => (
              currentResponse.status === 'fulfilled'
                ? [...previousResponsesData, ...currentResponse.value.data.timeslots]
                : previousResponsesData
            ),
            [],
          );

        setCalendarTimeslots(timeslotsData);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setCalendarTimeslotsError(errorMessage);
      }
      setCalendarTimeslotsLoading(false);
    };

    // We need to fetch light timeslots for all fetch dates when component is mounted and
    if (!(calendarTimeslots?.length > 1) && !currentDate) fetchTimeslotsWithoutAdditionalData();
  }, [
    combinedFetchParameters,
    currentDate,
    currentTreatment,
  ]);

  const combinedLoading = timeslotsLoading || calendarTimeslotsLoading;
  const combinedError = timeslotsError || calendarTimeslotsError;

  return {
    timeslotsArray,
    calendarTimeslots,
    timeslotsLoading: combinedLoading,
    isNextBatchLoading,
    timeslotsError: combinedError,
    getTimeslotsNextBatch,
  };
};

export default useGetTimeslots;
