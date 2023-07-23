import type { HTMLAttributes } from 'react';
import { ImageFrame } from '@/components/shared';

interface Props extends HTMLAttributes<HTMLDivElement> {
  thumbnail: string;
  title: string;
  description: string;
}

export function Card({ thumbnail, title, description, ...restProps }: Props) {
  return (
    <div className='flex w-full flex-col' {...restProps}>
      <ImageFrame src={thumbnail} alt={title} />
      <div className='gap flex flex-col px-5 py-[6px]'>
        <h2 className='text-sub-headline overflow-hidden text-ellipsis whitespace-nowrap'>{title}</h2>
        <p className='text-body2 overflow-hidden text-ellipsis whitespace-nowrap'>{description}</p>
      </div>
    </div>
  );
}
