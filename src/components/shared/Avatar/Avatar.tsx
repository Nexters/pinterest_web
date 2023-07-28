import Image from 'next/image';
import type { ComponentProps, MouseEventHandler } from 'react';
import { cn } from '@/utils/cn';

const PLACEHOLDER_SRC = '/images/avatar-placeholder.png';
const SIZE = 80;

interface AvatarProps {
  src?: string;
  nickname?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

type Props = AvatarProps & Omit<ComponentProps<typeof Image>, keyof AvatarProps>;

export function Avatar({ src = PLACEHOLDER_SRC, nickname, alt, className, onClick, ...restProps }: Props) {
  return (
    <div className='relative h-20 w-20 cursor-pointer overflow-hidden rounded-full' onClick={onClick}>
      <Image
        src={src}
        alt={nickname ?? alt}
        width={SIZE}
        height={SIZE}
        className={cn('object-cover object-center', className)}
        {...restProps}
      />
    </div>
  );
}
