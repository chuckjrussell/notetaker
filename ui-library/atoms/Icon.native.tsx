import * as React from 'react';
import Spellbook from '../../assets/images/spellBook.svg';
import BookIcon from '../../assets/images/icon_book.svg';
import IconMap from '../../assets/images/icon_map.svg';
import IconScroll from '../../assets/images/icon_scroll_open.svg';
import {IconType} from './Icon.shared';

export const iconMap: Record<
  IconType,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  spellBook: Spellbook,
  bookIcon: BookIcon,
  mapIcon: IconMap,
  scrollIcon: IconScroll,
};

interface IconProps {
  iconType: IconType;
  style?: React.CSSProperties;
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
