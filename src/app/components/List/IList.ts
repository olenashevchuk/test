import { Directions, GapsVariants, ShapeVariants } from '../../enums';

type ListDirections = keyof typeof Directions;
type Gaps = keyof typeof GapsVariants;
type BorderVariants = keyof typeof ShapeVariants;

interface IList {
  direction?: ListDirections;
  id?:any;
  gap?: Gaps;
  children: any;
  shape?: BorderVariants;
  className?:string;

}

export default IList;
