export type timeslotObjectType = {
  start: string;
  end: string;
  date: string;
  id: string;
  status: string;
  clinician: {
    name: string;
    avatarUrl: string;
  };
  clinic: {
    address1: string;
  };
  treatment: object;
  treatmentId: string;
  clinicianId: string;
  clinicId: string;
};

export interface timeslotsArrayItemType extends Object {
  timeslots?: timeslotObjectType[];
  date?: string;
}
export type timeslotsFetchingResult = {
  timeslotsArray:timeslotsArrayItemType[],
  calendarTimeslots:timeslotsArrayItemType[],
  timeslotsLoading:boolean,
  isNextBatchLoading:boolean,
  timeslotsError: string
  getTimeslotsNextBatch:() => void,
}

export type timeslotsFetchPromiseSettledResult = {
  data: {
    timeslots: timeslotsArrayItemType[],
  }
}
