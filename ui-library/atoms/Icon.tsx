import * as React from 'react';
import Spellbook from '../../assets/images/spellBook.svg?react';
import IconBook from '../../assets/images/icon_book.svg?react';
import IconMap from '../../assets/images/icon_map.svg?react';
import IconScroll from '../../assets/images/icon_scroll_open.svg?react';
import {IconType} from './Icon.shared';

export const iconMap: Record<
  IconType,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  spellBook: Spellbook,
  bookIcon: IconBook,
  mapIcon: IconMap,
  scrollIcon: IconScroll,
};

interface IconProps {
  iconType: IconType;
  style?: any;
}
export const Icon = ({iconType, style}: IconProps) => {
  const IconComponent = iconMap[iconType];
  return (
    <IconComponent
      width={style?.height || 199}
      height={style?.width || 199}
      style={style}></IconComponent>
  );
};
