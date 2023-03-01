import {
  CardVariants,
  CursorVariants,
  Directions,
  GapsVariants,
  ShapeVariants,
} from '../../enums';

import React from 'react';

type Variants = keyof typeof CardVariants;
type BorderVariants = keyof typeof ShapeVariants;
type CardDirections = keyof typeof Directions;
type Gaps = keyof typeof GapsVariants;
type Cursor = keyof typeof CursorVariants;

interface ICard {
  textCenter?: boolean;
  paddingless?: boolean;
  variant?: Variants;
  direction?: CardDirections;
  gap?: Gaps;
  shape?: BorderVariants;
  onClick?: any;
  cursor?: Cursor;
  children: React.ReactElement | React.ReactElement[] | string;
  pb?: string;
}

export default ICard;
