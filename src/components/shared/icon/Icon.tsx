import { SVGProps } from 'react';
import clsx from 'clsx';
import * as icons from '@/assets/icons';

const RIGHT_ARROW_WIDTH = 40;
const DEFAULT_SIZE = 24;

type IconType = keyof typeof icons;

interface Props extends SVGProps<SVGSVGElement> {
  iconType: IconType;
}

export function Icon({
  iconType,
  color,
  width = iconType === 'RightArrow' ? RIGHT_ARROW_WIDTH : DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  ...restProps
}: Props) {
  const Icon = icons[iconType];
  console.log(iconType, color, !color)
  
  return (
    <Icon
      fill={color}
      width={width}
      height={height}
      className={clsx({ 'fill-grayscale-500': !color })}
      {...restProps}
    />
  );
}
