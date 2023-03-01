/**
 * "Given a range size, return an array of dates."
 *
 * The first line of the function is a TypeScript type annotation.
 * It's saying that the function takes a number and returns an array
 * of objects
 * @param {number} rangeSize - The number of days you want to get.
 * @returns An array of dates
 */

interface Day {
  weekday: string;
  monthName: string;
  date: object;
  day: number;
  year: number;
  month: number;
}

const getDateRange = (rangeSize: number): Day[] => {
  const today = new Date();
  const arr = [];
  const dt = new Date(today);
  const end = new Date(new Date().setDate(new Date().getDate() + rangeSize));

  while (dt.toString() !== end.toString()) {
    const date = new Date(dt);
    const weekday = date.toLocaleDateString('nor', { weekday: 'long' });
    const monthName = date.toLocaleDateString('nor', { month: 'long' });
    arr.push({
      weekday,
      monthName,
      date,
      day: date.getDate(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

export default getDateRange;
