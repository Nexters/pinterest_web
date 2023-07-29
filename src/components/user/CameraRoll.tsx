import { type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const FILM_HOLE_COUNT = 11;

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  photos?: string[];
}

export function CameraRoll({ title, photos = [], className, ...restProps }: Props) {
  const srcs = Array.from({ length: 10 }, (_, i) => photos[i] ?? '');

  return (
    <div className={cn('ml-5 bg-grayscale-700', className)} {...restProps}>
      <div className='flex items-center justify-between py-2 pl-3.5 pr-5'>
        <h2 className='text-body1 text-grayscale-200'>{title}</h2>
        <span className='text-caption-eng text-grayscale-100'>{`${photos.length} Cuts`}</span>
      </div>
      <div className='flex gap-2.5 overflow-x-scroll scrollbar-hide'>
        {srcs.map((photo, idx) => (
          <div key={idx} className='aspect-[3/4] h-[250px] bg-grayscale-400' />
        ))}
      </div>
      <div className='flex items-center gap-4 px-3.5 py-2'>
        {[...Array(FILM_HOLE_COUNT)].map((_, idx) => (
          <div key={idx} className='h-3 w-6 shrink-0 gap-4 rounded bg-grayscale-400' />
        ))}
      </div>
    </div>
  );
}
