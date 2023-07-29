import Image from 'next/image';
import type { ComponentProps, MouseEventHandler } from 'react';
import clsx from 'clsx';
import { cn } from '@/utils/cn';

const PLACEHOLDER_SRC = '/images/avatar-placeholder.png';
const HINT_TEXT = '한줄소개를 작성해주세요';
const SIZE = 80;

interface AvatarProps {
  nickname: string;
  src?: string;
  displayMeta?: boolean;
  description?: string;
  viewCount?: number;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

type Props = AvatarProps & Omit<ComponentProps<typeof Image>, keyof AvatarProps | 'alt'>;

export function Avatar({
  src = PLACEHOLDER_SRC,
  nickname,
  displayMeta = false,
  description,
  viewCount = 0,
  className,
  onClick,
  ...restProps
}: Props) {
  return (
    <div className={cn('flex items-center gap-5 text-primary', className)}>
      <div className='relative h-20 w-20 cursor-pointer overflow-hidden rounded-full' onClick={onClick}>
        <Image
          src={src}
          alt={nickname}
          width={SIZE}
          height={SIZE}
          className='object-cover object-center'
          {...restProps}
        />
      </div>
      {displayMeta && (
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2.5'>
            <strong className='text-accent-eng'>{nickname}</strong>
            <span className='text-caption-eng text-grayscale-500'>{`Total ${viewCount}`}</span>
          </div>
          <p className={clsx('text-body2-accent', !description && 'text-grayscale-300')}>{description ?? HINT_TEXT}</p>
        </div>
      )}
    </div>
  );
}
