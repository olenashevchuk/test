const calculateYear = (shortYear:any, individualNumber:any) => {
  const shortYearInt = parseInt(shortYear, 10);

  let centuryYears;
  if (
    individualNumber <= 999
    && individualNumber >= 900
    && shortYearInt >= 40
    && shortYearInt <= 99
  ) {
    centuryYears = 19;
  } else if (
    individualNumber <= 999
    && individualNumber >= 500
    && shortYearInt >= 0
    && shortYearInt <= 39
  ) {
    centuryYears = 20;
  } else if (individualNumber <= 749 && individualNumber >= 500) {
    centuryYears = 18;
  } else {
    centuryYears = 19;
  }

  return parseInt(`${centuryYears}${shortYear}`, 10);
};

/**
 * see https://www.skatteetaten.no/en/person/national-registry/birth-and-name-selection/children-born-in-norway/national-id-number/
 * @param {string} nin
 *
 */
const decomposePersonalNumber = (nin:string) => {
  const day:number = parseInt(nin.substring(0, 2), 10);
  const month:number = parseInt(nin.substring(2, 4), 10);
  const shortYear:string = nin.substring(4, 6);
  const extraDigits:number = parseInt(nin.substring(6, 11), 10);
  const individualNumber:number = parseInt(nin.substring(6, 9), 10);

  const year:number = calculateYear(shortYear, individualNumber);
  return {
    day,
    month,
    year,
    extraDigits,
  };
};

export default decomposePersonalNumber;
