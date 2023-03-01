import { Colors, TextSizes } from '../../enums';

type SizeVariants = keyof typeof TextSizes;
type ColorVariants = keyof typeof Colors;

interface ITitle {
  size?: SizeVariants;
  color?: ColorVariants;
  children: any;
  className?: string;
}

export default ITitle;
