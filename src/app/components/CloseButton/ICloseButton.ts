import { ButtonSizes, ButtonVariants, Positions } from '../../enums';

import React from 'react';

type SizeVariants = keyof typeof ButtonSizes;
type PositionVariants = keyof typeof Positions;
type Variants = keyof typeof ButtonVariants;

interface IButton {
  boxShadow?:boolean;
  size?: SizeVariants;
  block?: boolean;
  variant?: Variants;
  children?: React.ReactElement | React.ReactElement[] | string;
  id?: string;
  onClick?: any;
  className?: string;
  position?:PositionVariants;
  top?:string;
  left?:string;
  right?:string;
  bottom?:string;
  disabled?: boolean;
  padding?:string;
}

export default IButton;
