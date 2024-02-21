import * as React from 'react';
import Spellbook from '../../assets/images/spellBook.svg?react';

export type IconType = 'spellBook';

export const iconMap: Record<
  IconType,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  spellBook: Spellbook,
};

interface IconProps {
  iconType: IconType;
  style?: any;
}
export const Icon = ({iconType, style}: IconProps) => {
  const IconComponent = iconMap[iconType];
  return <IconComponent style={style}></IconComponent>;
};
