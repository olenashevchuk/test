const useTransformDate = () => {
  const currentDate = new Date();

  const getDayName = (stringDate: any) => {
    const fullDayName = (stringDate ? new Date(stringDate) : currentDate)
      .toLocaleDateString('no-NO', { weekday: 'long' }).toString();
    return fullDayName.charAt(0).toUpperCase() + fullDayName.slice(1);
  };

  const getDate = (stringDate: any) => (
    stringDate ? new Date(stringDate) : currentDate
  ).getDate();

  const getDay = (stringDate: any) => (
    stringDate ? new Date(stringDate) : currentDate
  ).getDay();

  const getMonth = (stringDate: any) => (
    (stringDate ? new Date(stringDate) : currentDate).getMonth() + 1
  );
  const getMonthName = (stringDate: any) => {
    const fullMonthName = (stringDate ? new Date(stringDate) : currentDate)
      .toLocaleDateString('no-NO', { month: 'long' }).toString();
    return fullMonthName.charAt(0).toUpperCase() + fullMonthName.slice(1);
  };

  const getFullYear = (stringDate: any) => (
    stringDate ? new Date(stringDate) : currentDate
  ).getFullYear();

  const getHours = (stringDate: any) => (
    stringDate ? new Date(stringDate) : currentDate
  ).getHours().toString();

  const getMinutes = (stringDate: any) => (
    stringDate ? new Date(stringDate) : currentDate
  ).getMinutes().toString();

  const getHoursAndMinutes = (stringDate: any) => {
    const hours = (getHours(stringDate)).padStart(2, '0');
    const minutes = (getMinutes(stringDate)).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // return date with passed delay for current date if "date" field was not passed
  // when "date" field passed, return new date with passed days delay for passed date
  // Example: getDateWithDelay(7) return current Date + 7 days in date format
  // Example: getDateWithDelay(5, new Date('2022-07-15')) return new Date('2022-07-20')
  const getDateWithDelay = (days: number, date?:any) => {
    const result = date ? new Date(date) : new Date();
    result.setDate(result.getDate() + days);
    return result;
  };

  // used for calendar item data parsing, get
  const getISOStringWithoutTimezone = (date:Date, getDateWithoutTime?:boolean) => {
    if (!date) return '';
    // get timezone offset in milliseconds to reset it in iso string
    const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
    // generate ISO string without timezone offset
    const localISOTime = (new Date(date.getTime() - timezoneOffset)).toISOString().slice(0, -1);
    if (getDateWithoutTime) {
      const [dateWithoutTimezone] = localISOTime.split('T');
      return dateWithoutTimezone;
    }

    return localISOTime;
  };

  return {
    getDayName,
    getDate,
    getDay,
    getHours,
    getMonth,
    getMonthName,
    getFullYear,
    getMinutes,
    getHoursAndMinutes,
    getDateWithDelay,
    getISOStringWithoutTimezone,
  };
};

export default useTransformDate;
