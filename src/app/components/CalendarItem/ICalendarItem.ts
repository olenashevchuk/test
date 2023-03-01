import { CalendarItemSizes, CursorVariants } from '../../enums';

type SizeVariants = keyof typeof CalendarItemSizes;
type Cursor = keyof typeof CursorVariants;

interface ICalendarItem {
  name: string;
  monthName: string;
  showedDay?: boolean;
  number: number;
  size?: SizeVariants;
  selected?: boolean;
  disabled?: boolean;
  tabIndex: number;
  onClick?: any;
  cursor?: Cursor;
  bgc?: any;

}

export default ICalendarItem;
