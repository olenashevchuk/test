import { AvatarSizes } from '../../enums';

type SizeVariants = keyof typeof AvatarSizes;

interface IAvatar {
  size?: SizeVariants;
  src: any;
  alt: string;
}

export default IAvatar;
