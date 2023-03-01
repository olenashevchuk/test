import { Colors, TitleSizes } from '../../enums';

type SizeVariants = keyof typeof TitleSizes;
type ColorVariants = keyof typeof Colors;

interface ITitle {
  size?: SizeVariants;
  color?: ColorVariants;
  children: any;
  id?: string;
}

export default ITitle;
