import {
  Positions,
} from '../../enums';

type PositionVariants = keyof typeof Positions;

interface ISpinner {
  position?: PositionVariants;
  zIndex?: number;
  spinnerShadow?:boolean,
  size?: number;
}

export default ISpinner;
